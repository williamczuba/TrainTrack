package controllers

import "github.com/revel/revel"

type Map struct {
	App
}

func (c Map) Index() revel.Result {
	return c.Render()
}
