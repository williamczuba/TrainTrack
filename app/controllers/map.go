package controllers

import (
	"github.com/revel/revel"
	"TrainTrack/app/routes"
	"TrainTrack/app/models"
	"golang.org/x/crypto/bcrypt"
)

//Map structure, needs to extend App (which extends gorp and revel controller) to be a controller
type Map struct {
	App
}

//Serve the Index page for the map
func (c Map) Index() revel.Result {
	// TODO: Check to make sure a user is approved.  Otherwise re-route them to the progress page
	return c.Render()
}

//Utility function to check if the user is connected, and if not to return revel redirect, if they are, return nil
func (c Map) checkUser() revel.Result {
	if user := c.connected(); user == nil {
		c.Flash.Error("Please log in first")
		return c.Redirect(routes.App.Index())
	}
	return nil
}

func (c Map) Settings() revel.Result {
	if c.connected() == nil {
		c.Redirect(routes.App.Index())
	}
	return c.Render()
}

func (c Map) SaveSettings(password, verifyPassword string) revel.Result {
	models.ValidatePassword(c.Validation, password)
	c.Validation.Required(verifyPassword).
		Message("Please verify your password")
	c.Validation.Required(verifyPassword == password).
		Message("Your password doesn't match")
	if c.Validation.HasErrors() {
		c.Validation.Keep()
		return c.Redirect(routes.Map.Settings())
	}

	bcryptPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	_, err := c.Txn.Exec("update User set HashedPassword = ? where UserId = ?",
		bcryptPassword, c.connected().UserId)
	if err != nil {
		panic(err)
	}
	c.Flash.Success("Password updated")
	return c.Redirect(routes.Map.Index())
}