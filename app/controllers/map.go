package controllers

import (
	"github.com/revel/revel"
	"TrainTrack/app/routes"
	"TrainTrack/app/models"
	"golang.org/x/crypto/bcrypt"
	"TrainTrack/packetDecoding"
)

//Map structure, needs to extend App (which extends gorp and revel controller) to be a controller
type Map struct {
	App
}

////TODO
////Get packets, decipher them, look up the addresses from the mcp data-table, ensure it's atcs protocol (look at the table),
// then get important mnemonics based on layer info (control or indication), and return it (the mnemonics)
func (c Map) getTrainData() string{
	str := packetDecoding.GetPacket()
	l3 := packetDecoding.GenLayer3(str)
	address := l3.SourceAddr


	mcp := c.getMCP(address)
	println(mcp)
	//need to access the table
	//loop? to access each value in the InitMCPDB?
	//or easy return?
	//9.2.11 = indication
	return mcp.ControlMnemonics


}

func (c Map) getMCP(address string) *models.Mcp {
	mcp, err := c.Txn.Select(models.Mcp{}, `select * from MCP where Address = ?`, address)
	if(err != nil){
		panic(err)
	}

	if len(mcp) == 0 {
		println("NO mcp with that address: ", address)
		return nil // if none, then they don't exist
	}
	//otherwise return the result
	return mcp[0].(*models.Mcp)
}

//Serve the Index page for the map
func (c Map) Index() revel.Result {
	// TODO: Check to make sure a user is approved.  Otherwise re-route them to the progress page
	// if not signed in, go to login
	if c.connected() == nil {
		return c.Redirect(routes.App.Index())
	}
	// if not approved, go to pending
	if !c.connected().Approved {
		return c.Redirect(routes.App.AppPending())
	}
	//otherwise we're good to go.
	/*
	To render the map:
	1) mnemonics - Start, Location, Destination
	 */
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