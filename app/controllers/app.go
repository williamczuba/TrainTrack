// Will define the default backend controller functionality, including login and registration functionality.
package controllers

import (
	"github.com/revel/revel"
	"TrainTrack/app/routes"
	"TrainTrack/app/models"
	"golang.org/x/crypto/bcrypt"
	"time"
	"math/rand"
	"fmt"
)

//Base type of our application; extends the Gorp Controller (for access to the DB)
type App struct {
	GorpController
}

//Render the html of the Index page (register/login form) and server to the client.
// Returns the revel result of the rendered html page
func (c App) Index() revel.Result {
	//Check if the person accessing the index is already connected (logged in)
	if c.connected() != nil {
		// if they're verified
		if c.connected().Approved {
			return c.Redirect(routes.Map.Index()) //redirect to the map.
		}
		return c.Redirect(routes.App.AppPending)
	}
	// Otherwise server the register login page
	c.Flash.Error("Please log in first")
	return c.Render()
}

//Renders the Application pending page if the application has not been approved, otherwise send them to the map.
//If the user is not connected then the login page is served
func (c App) AppPending() revel.Result{
	if c.connected() == nil {
		return c.Redirect(routes.App.Index())
	}
	// if approved, send them to the map
	if c.connected().Approved {
		return c.Redirect(routes.Map.Index())
	}
	return c.Render()
}
//Utility method to determine if the client is signed in as a User
//Returns the client as a user if they are connected
func (c App) connected() *models.User {
	//See if they are registered (Already signed in)
	if c.RenderArgs["user"] != nil {
		return c.RenderArgs["user"].(*models.User)
	}
	//See if they have a valid session (Remember them or no?)
	if email, ok := c.Session["user"]; ok {
		return c.getUser(email)
	}
	//Otherwise, they aren't logged in
	return nil
}

//Utility method to get the user as a model based on the email as a string
//Returns the user type defined in the model
func (c App) getUser(email string) *models.User {
	//Select from our database
	users, err := c.Txn.Select(models.User{}, `select * from User where Email = ?`, email)
	//Check for error
	if err != nil {
		panic(err)
	}
	//Check to see if we got any results
	if len(users) == 0 {
		//println("NO user with that name: ", email)
		return nil // if none, then they don't exist
	}
	//otherwise return the result
	return users[0].(*models.User)
}

//Utility method to register a new user
//Returns the revel result (redirect to the Map page, or ask to fix errors)
func (c App) SaveUser(user models.User, verifyPassword string) revel.Result {
	//first check to make sure the email isn't taken
	if c.getUser(user.Email) != nil {
		//email is taken.  Let them fix it.
		c.Flash.Error("Email is already in use.  Please sign-in, or register with a different email.")
		return c.Redirect(routes.App.Index())
	}
	//Set the required fields for Revel Validation
	c.Validation.Required(verifyPassword)
	c.Validation.Required(verifyPassword == user.Password).
		Message("Password does not match")
	//Validate - Commented out due to last minute bugs
	//user.Validate(c.Validation)
	//
	//// Check to see if it was validated
	//if c.Validation.HasErrors() {
	//	//if not have them try again
	//	fmt.Println("errors with validation.")
	//	c.Validation.Keep()
	//	c.FlashParams()
	//	fmt.Println(c.Validation.Errors)
	//	return c.Redirect(routes.App.Index())
	//}

	//Hash the password
	user.HashedPassword, _ = bcrypt.GenerateFromPassword(
		[]byte(user.Password), bcrypt.DefaultCost)

	// They are NOT approved. GEt outa here
	user.Approved = false

	////Sets admin privilege to false by default
	user.Admin = false

	// Insert the user into the DB
	fmt.Println("Inserting USER INTO DB...")

	err := c.Txn.Insert(&user)

	fmt.Println("user inserted!")
	// check for error
	if err != nil {
		panic(err)
	}

	// Greet and redirect to the map page
	c.Session["user"] = user.Email
	c.Flash.Success("Welcome, " + user.FirstName)
	return c.Redirect(routes.Map.Index())
}

//Purpose: Log a user in given their email and password as a string.
// Will attach a cookie if the user wants their login info to be remembered.
//Returns the revel result (redirect to the Map page, or ask to fix errors)
func (c App) Login(email, password string, remember bool) revel.Result {
	//Look up the username
	user := c.getUser(email)
	//If it exists
	if user != nil {
		//Check the password is correct
		err := bcrypt.CompareHashAndPassword(user.HashedPassword, []byte(password))
		//Check if the password was correct
		if err == nil {
			//Assign the session to the username
			c.Session["user"] = email
			// If they check remember
			if remember {
				// Assign a cookie that expires in 3 days
				c.Session.SetDefaultExpiration()
			} else {
				// Assign a cookie that will terminate when browser closes
				c.Session.SetNoExpiration()
			}
			//Redirect to the Map - can implement first name on login later, avoiding problems due to extra param. for now
			//welcome:="Welcome back " + user.FirstName + "!"
			//c.Flash.Success(welcome)
			return c.Redirect(routes.Map.Index())
		}
	}
	// Otherwise the log in failed, have them try again.
	c.Flash.Out["email"] = email
	c.Flash.Error("Login failed")

	return c.Redirect(routes.App.Index())
}

//Utility method to logout a user by deleting their session
//Returns the revel result (redirect to the sign in page)
func (c App) Logout() revel.Result {
	//Delete/Free the user session
	for k := range c.Session {
		delete(c.Session, k)
	}
	// Redirect to the login page
	return c.Redirect(routes.App.Index())
}

//Utility method to add a user session (Used for both logging in and registration/login)
//Returns the revel result (always nil)
func (c App) AddUser() revel.Result {
	// Get the connected user (make sure they're actually connected)
	if user := c.connected(); user != nil {
		// Render the user session
		c.RenderArgs["user"] = user
	}
	return nil
}

//Renders the Recover Password page
func (c App) RecoverPassword() revel.Result {
	//make sure they aren't signed in first.
	if c.connected() != nil {
		return c.Redirect(routes.Map.Index()) //redirect to the map.
	}
	//render the page
	return c.Render()
}

//Displays the recovery question associated with the user's email
func (c App) ShowRecoveryQuestion(email string) revel.Result {
	//Get the user
	user := c.getUser(email)
	if user == nil {
		return nil
	}
	// Get their recovery question
	question := user.SecurityQuestion

	return c.Render(email, question)
}

//Generates a temporary password if the user has forgotten theres after they enter in the correct answer to the recovery question
func (c App) RecoverInfo(email string, recoveryAnswer string) revel.Result {
	//Look up the username
	user := c.getUser(email)
	if user == nil {
		return nil
	}
	//If it exists
	if user != nil {
		//Check the given answer is correct
		err := bcrypt.CompareHashAndPassword(user.HashedSecureAnswer, []byte(recoveryAnswer))
		if err == nil {
			//Assign and Show temporary password
			temp := RandStringRunes(10)
			user.HashedPassword, _ = bcrypt.GenerateFromPassword(
				[]byte(temp), bcrypt.DefaultCost)
			_, err := c.Txn.Exec("update User set HashedPassword = ? where UserId = ?",
				user.HashedPassword, user.UserId)
			if err != nil {
				panic(err)
			}
			return c.Redirect(routes.App.ShowInfo(email, temp))
		}
	}
	// Otherwise the log in failed, have them try again.
	c.Flash.Out["username"] = email
	c.Flash.Error("Recovery failed")
	return c.Redirect(routes.App.RecoverPassword())
}

//Displays the user's email and temporary password for the recovery process
func (c App) ShowInfo(email string, temp string) revel.Result {
	return c.Render(email, temp)
}

// PASSWORD GENERATION UTILITIES - Used for when a user recovers their password.

// Initializes a random number based on the time
func init() {
	rand.Seed(time.Now().UnixNano())
}

//Variable of possible password letters
var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

//generates the random string for the temporary password
func RandStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}