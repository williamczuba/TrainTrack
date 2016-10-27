package controllers

import (
	"github.com/revel/revel"
	"TrainTrack/app/routes"
	"TrainTrack/app/models"
	"golang.org/x/crypto/bcrypt"
)

type Admin struct {
	App
}

//Serves the Admin Dashboard to the admin
func (c Admin) Dash() revel.Result {
	return c.Render()
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
			if user.Admin == true {
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
	}
	// Otherwise the log in failed, have them try again.
	c.Flash.Out["email"] = email
	c.Flash.Error("Login failed")
	return c.Redirect(routes.App.Index())
}