package controllers

import "github.com/revel/revel"

type App struct {
	*revel.Controller
}

//The Index page is the register/login page.
func (c App) Index() revel.Result {
	return c.Render()
}
