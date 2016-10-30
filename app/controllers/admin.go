package controllers

import (
	"github.com/revel/revel"
	"TrainTrack/app/routes"
	"TrainTrack/app/models"
	"golang.org/x/crypto/bcrypt"
	"fmt"
)

type Admin struct {
	App
}

//Serves the Admin Dashboard to the admin
func (c Admin) Dash() revel.Result {
	//Get all applicants who aren't approved
	users, err := c.Txn.Select(models.User{}, `select * from User where Approved = ?`, false)
	//Check for error
	if err != nil {
		panic(err)
	}
	//Check to see if we got any results
	//if len(users) == 0 {
	//	return c.Render() // if none, then they don't exist
	//}
	fmt.Println("Users: ", users)
	for i:= 0; i < len(users); i++ {
		fmt.Println("Approved: ", ((users[i])).(*models.User).Approved)
	}
 	return c.Render(users)
}

//Serve the Index page for the admin login page
func (c Admin) Index() revel.Result {
	//Check if the person accessing the index is already connected (logged in)
	if c.adminConnected() != nil {
		return c.Redirect(routes.Admin.Dash()) //redirect to the admin dashboard
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
func (c App) adminConnected() *models.User {
	//See if they are registered (Already signed in)
	if c.RenderArgs["admin"] != nil {
		return c.RenderArgs["admin"].(*models.User)
	}
	//See if they have a valid session (Remember them or no?)
	if email, ok := c.Session["admin"]; ok {
		return c.getUser(email)
	}
	//Otherwise, they aren't logged in
	return nil
}

// Log the admin in
// TODO: backend team should implement this similar to the regular user login,
// 		but utilizing an Admin Database as well.
//			Is an extra admin database necessary? Currently have bool attached to user, could be fine?
func (c Admin) Login(email, password string, remember bool) revel.Result {
	//Look up the username
	user := c.getUser(email)
	//If it exists
	if user != nil {
		//Check the password is correct
		err := bcrypt.CompareHashAndPassword(user.HashedPassword, []byte(password))
		//Check if the password was correct
		if err == nil {
			// TODO: Check to make sure they are an admin!
				//Assign the session to the username
				c.Session["admin"] = email
				// If they check remember
				if remember {
					// Assign a cookie that expires in 3 days
					c.Session.SetDefaultExpiration()
				} else {
					// Assign a cookie that will terminate when browser closes
					c.Session.SetNoExpiration()
				}
				//Redirect to the Map - can implement first name on login later, avoiding problems due to extra param. for now
				welcome:="Welcome back " + user.FirstName + "!"
				c.Flash.Success(welcome)
				return c.Redirect(routes.Admin.Dash())
		}
	}
	// Otherwise the log in failed, have them try again.
	c.Flash.Out["email"] = email
	c.Flash.Error("Login failed")
	return c.Redirect(routes.App.Index())
}

func (c Admin) Approve(UserId int) revel.Result {
	if c.Params.Get("approve") == "Approve"  {
		_, err := c.Txn.Exec("update User set Approved = ? where UserId = ?",
			true, UserId)
		if err != nil {
			panic(err)
		}
	} else if c.Params.Get("reject") == "Reject" {
		// delete their user
		_, err := c.Txn.Exec("DELETE FROM User WHERE UserId = ?;",
			UserId)
		if err != nil {
			panic(err)
		}
	} else {
		fmt.Println("Accept: ", c.Params.Get("Accept"), "Reject: ", c.Params.Get("Reject"), " approve: ", c.Params.Get("approve"))
	}
	// TODO. Use Ajax instead of rerouting.
	return c.Redirect(routes.Admin.Dash())
}

//Purpose: Utility method to get the user as a model based on the username
//Params: Email as a string
//Returns:
//	The user type defined in the model
//Prints:
//	Nothing
func (c App) getUserById(UserId int) *models.User {
	//Select from our database
	users, err := c.Txn.Select(models.User{}, `select * from User where UserId = ?`, UserId)
	//Check for error
	if err != nil {
		panic(err)
	}
	//Check to see if we got any results
	if len(users) == 0 {
		println("NO user with that UID: ", UserId)
		return nil // if none, then they don't exist
	}
	//otherwise return the result
	return users[0].(*models.User)
}
