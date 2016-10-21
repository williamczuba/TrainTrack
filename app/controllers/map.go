package controllers

import (
	"github.com/revel/revel"
	"TrainTrack/app/routes"
)

//Map structure, needs to extend App (which extends gorp and revel controller) to be a controller
type Map struct {
	App
}

//Serve the Index page for the map
func (c Map) Index() revel.Result {
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