package controllers

import (
	"github.com/revel/revel"
	"TrainTrack/app/routes"
	"TrainTrack/app/models"
	"golang.org/x/crypto/bcrypt"
	"time"
	"math/rand"
)

//Purpose: Base type of our application; extends the Gorp Controller (for access to the DB)
type App struct {
	GorpController
}

//Purpose: Render the html of the Index page (register/login form) and server to the client
//Params: None
//Returns:
//	The revel result of the rendered html page
func (c App) Index() revel.Result {
	//Check if the person accessing the index is already connected (logged in)
	if c.connected() != nil {
		return c.Redirect(routes.Map.Index()) //redirect to the map.
	}
	// Otherwise server the register login page
	c.Flash.Error("Please log in first")
	return c.Render()
}

//Purpose: Utility method to determine if the client is signed in as a User
//Params: None
//Returns:
//	The client as a user if they are connected
//Prints:
//	Nothing
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

//Purpose: Utility method to get the user as a model based on the username
//Params: Email as a string
//Returns:
//	The user type defined in the model
//Prints:
//	Nothing
func (c App) getUser(email string) *models.User {
	//Select from our database
	users, err := c.Txn.Select(models.User{}, `select * from User where Email = ?`, email)
	//Check for error
	if err != nil {
		panic(err)
	}
	//Check to see if we got any results
	if len(users) == 0 {
		println("NO user with that name: ", email)
		return nil // if none, then they don't exist
	}
	//otherwise return the result
	return users[0].(*models.User)
}

//Purpose: Utility method to register a new user
//Params:
//	User as a model
//	The Verify Password as a string
//Returns:
//	The revel result (redirect to the Map page, or ask to fix errors)
//Prints:
//	Nothing
func (c App) SaveUser(user models.User, verifyPassword string) revel.Result {
	//Set the required fields for Revel Validation
	c.Validation.Required(verifyPassword)
	c.Validation.Required(verifyPassword == user.Password).
		Message("Password does not match")
	//Validate
	user.Validate(c.Validation)

	// Check to see if it was validated
	if c.Validation.HasErrors() {
		//if not have them try again
		c.Validation.Keep()
		c.FlashParams()
		return c.Redirect(routes.App.Index())
	}

	//Hash the password
	user.HashedPassword, _ = bcrypt.GenerateFromPassword(
		[]byte(user.Password), bcrypt.DefaultCost)
	////Sets admin privilege to false by default (unsure if necessary here)
	//user.Admin = false
	// Insert the user into the DB
	err := c.Txn.Insert(&user)
	// check for error
	if err != nil {
		panic(err)
	}
	// Greet and redirect to the map page
	c.Session["user"] = user.Email
	c.Flash.Success("Welcome, " + user.FirstName)
	return c.Redirect(routes.Map.Index())
}

//Purpose: Log a user in
//Params:
//	username
//	The Verify Password as a string
//Returns:
//	The revel result (redirect to the Map page, or ask to fix errors)
//Prints:
//	Nothing
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
			println("SUCCESS")
			//Redirect to the Map - can implement first name on login later, avoiding problems due to extra param. for now
			c.Flash.Success("Welcome back")
			return c.Redirect(routes.Map.Index())
		}
	}
	// Otherwise the log in failed, have them try again.
	c.Flash.Out["email"] = email
	c.Flash.Error("Login failed")
	println("Failed")

	return c.Redirect(routes.App.Index())
}

//Purpose: Utility method to logout a user by deleting their session
//Params:
//Returns:
//	The revel result (redirect to the sign in page)
//Prints:
//	Nothing
func (c App) Logout() revel.Result {
	//Delete/Free the user session
	for k := range c.Session {
		delete(c.Session, k)
	}
	// Redirect to the login page
	return c.Redirect(routes.App.Index())
}

//Purpose: Utility method to add a user session (Used for both logging in and registration/login)
//Params:
//Returns:
//	The revel result (always nil)
//Prints:
//	Nothing
func (c App) AddUser() revel.Result {
	// Get the connected user (make sure they're actually connected)
	if user := c.connected(); user != nil {
		// Render the user session
		c.RenderArgs["user"] = user
	}
	return nil
}

func (c App) RecoverPassword() revel.Result {
	//make sure they aren't signed in first.
	if c.connected() != nil {
		return c.Redirect(routes.Map.Index()) //redirect to the map.
	}
	//render the page
	return c.Render()
}

func (c App) ShowRecoveryQuestion(email string) revel.Result {
	println("Email:", email)
	//Get the user
	user := c.getUser(email)
	println("Demo user: ", user.Email)
	println("Question from model: ", user.SecurityQuestion)
	if user == nil {
		println("ERROR user is nil...")
		return nil
	}
	// Get their recovery question
	question := user.SecurityQuestion

	return c.Render(email, question)
}

func (c App) RecoverInfo(email string, recoveryAnswer string) revel.Result {
	//Look up the username
	user := c.getUser(email)
	println("Demo user: ", user.Email)
	println("Question from model: ", user.SecurityQuestion)
	if user == nil {
		println("ERROR user is nil...")
		return nil
	}
	//If it exists
	if user != nil {
		//Check the given answer is correct
		err := bcrypt.CompareHashAndPassword(user.HashedSecureAnswer, []byte(recoveryAnswer))
		if err == nil {
			println("Password recovered! Generating new password...")
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
	println("Answer failed.  Answer given: ", recoveryAnswer)
	println("Correct Answer: ", user.SecureAnswer)
	// Otherwise the log in failed, have them try again.
	c.Flash.Out["username"] = email
	c.Flash.Error("Recovery failed")
	return c.Redirect(routes.App.RecoverPassword())
}

func (c App) ShowInfo(email string, temp string) revel.Result {
	println("SHOWING INFO: Email:", email, "PW: ", temp)
	return c.Render(email, temp)
}

// PASSWORD GENERATION UTILITIES
func init() {
	rand.Seed(time.Now().UnixNano())
}

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func RandStringRunes(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}