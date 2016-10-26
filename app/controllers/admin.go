package controllers

import "github.com/revel/revel"

type Admin struct {
	App
}

//Serve the Index page for the admin login page
func (c Admin) Index() revel.Result {
	//Check if the person accessing the index is already connected (logged in)
	if c.connected() != nil {
		//return c.Redirect(routes.Map.Index()) //redirect to the map.
	}
	// Otherwise server the register login page
	c.Flash.Error("Please log in first")
	return c.Render()
}

// Log the admin in
// TODO: backend team should implement this similar to the regular user login,
// 		but utilizing an Admin Database as well.
func (c Admin) Login() revel.Result {
	return nil
}