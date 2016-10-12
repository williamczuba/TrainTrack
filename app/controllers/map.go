package controllers

import (
	"github.com/revel/revel"
	"TrainTrack/app/routes"
)

type Map struct {
	App
}

func (c Map) Index() revel.Result {
	return c.Render()
}
func (c Map) checkUser() revel.Result {
	if user := c.connected(); user == nil {
		c.Flash.Error("Please log in first")
		return c.Redirect(routes.App.Index())
	}
	return nil
}