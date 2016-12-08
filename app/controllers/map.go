package controllers

import (
	"github.com/revel/revel"
	"TrainTrack/app/routes"
	"TrainTrack/app/models"
	"golang.org/x/crypto/bcrypt"
	//"TrainTrack/app/packetDecoding"
	//"github.com/revel/samples/chat/app/chatroom"
	"TrainTrack/app/packetDecoding"
	"fmt"
)

//Map structure, needs to extend App (which extends gorp and revel controller) to be a controller
type Map struct {
	App
}

// Since we had to restrict our program, this hashmap (really a hashset) will store all of the known MCP names from the front end.  This will prevent us from sending out unnecessary packets, and should therefor help minimize server network usage.
var KNOWN_MCP map[string]bool = map[string]bool{
	"CP-50":true,
	"CP-53":true,
	"CP-62":true,
	"CP-64":true,
	"CP-65":true,
	"CP-67":true,
	"Carl":true,
	"Front":true,
	"Lees Cross Roads":true,
	"Ross":true,
	"Ship":true,
	"Spring":true,
	"Town":true,
	"_proto_":true, // This shows up on the front end, so while I know it doesn't exist in the MCP, I decided to include it for consistency
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

func (c Map) GetMCP(address string) *models.Mcp {
	mcp, err := c.Txn.Select(models.Mcp{}, `select * from MCP where Address = ?`, ""+address)
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


type ClientTrainData struct {
	Name 			string	`json:name`
	MilePost		string	`json:"mile_post"`
	MessageType		string `json:"message_type"`
	Mnemonics 		string `json:"mnemonics"`
	Bits 			string `json:"bits"`
	//Subdivision		string	`json:"subdivision"`
	//StateCounty		string	`json:"state_county"`
	CodeLineData		string	`json:"code_line_data"`
}

//AJAX for a client to begin to listen for updates (they will GET the train info from this function)
////Get packets, decipher them, look up the addresses from the mcp data-table, ensure it's atcs protocol (look at the table),
// then get important mnemonics based on layer info (control or indication), and return it (the mnemonics)
func (c Map) GetTrainData() revel.Result {
	//fmt.Println("Serving up train Data")
	var CTD ClientTrainData
	// Get packets
	for {
		// This method call is essentially an event listener for packets.
		trainInfo := packetDecoding.GetTrainInfo()
		if trainInfo == nil {
			fmt.Println("Server may be closed, or there was an issue with the packet.  Unable to fetch Train Info, dropping packet.")
			continue
		}
		label := trainInfo.L4P.Label
		fmt.Println("Label", label)
		mcp := c.GetMCP(trainInfo.L3.SourceAddr)
		if mcp == nil {
			fmt.Println("No Mcp with that address...")
			continue //Don't send anything, get another packet... //c.RenderJson(CTD)
		}
		if !KNOWN_MCP[mcp.Name] { // if the mcp won't be recognized on the front end, dont send it
			fmt.Println("MCP is not on our map...")
			continue // get another packet.
		}

		//Construct the train data to render.

		//label := trainInfo.L4P.Label
		CTD.Name = mcp.Name
		//CTD.StateCounty = mcp.StateCounty
		CTD.CodeLineData = trainInfo.L4P.CodeLineData
		CTD.MilePost = mcp.Milepost
		//CTD.Subdivision = mcp.Subdivision
		if label == "9.2.11" { //Indication Packet
			CTD.MessageType = "Indication"
			CTD.Bits = mcp.IndicationBits
			CTD.Mnemonics = mcp.IndicationMnemonics

		} else if label == "9.0.1" { //Control Packet
			CTD.MessageType = "Control"
			CTD.Bits = mcp.ControlBits
			CTD.Mnemonics = mcp.ControlMnemonics
		}
		return c.RenderJson(CTD)
	}

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