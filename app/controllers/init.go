package controllers

import (
	"github.com/revel/revel"

	"io/ioutil"
	"strings"
	"TrainTrack/app/models"

	"reflect"

	"strconv"
)

//Register the revel intercepts and initialize the database
func init() {
	print("InitDB...")
	revel.OnAppStart(InitMCPDB)
	//When the app starts, initialize the db
	revel.OnAppStart(InitDB)

	print("Registering Interceptors...")
	/* REGISTER INTERCEPTORS: run on every action*/
	//All interceptors that run before the action!
	//Start registering with the DB
	revel.InterceptMethod((*GorpController).Begin, revel.BEFORE)
	//Add the user to the app
	revel.InterceptMethod(App.AddUser, revel.BEFORE)
	//check the user
	revel.InterceptMethod(Map.checkUser, revel.BEFORE)

	//All that run after the action... commits the action to the DB
	revel.InterceptMethod((*GorpController).Commit, revel.AFTER)

	//The last thing to run.. is to rollback the DB
	revel.InterceptMethod((*GorpController).Rollback, revel.FINALLY)

	print("Init Complete.")

}

// Initialize the MCPD every time.
var InitMCPDB func() = func() {
	bp := revel.BasePath
	println(revel.BasePath)

	fileBytes, err := ioutil.ReadFile(bp + "/public/NS Harrisburg Division - Version 14.8.mcp")
	if err != nil {
		panic(err)
	}
	fileAsString := string(fileBytes)
	lines := strings.Split(fileAsString, "\n")
	println("lenght of lines: ", strconv.Itoa(len(lines)))
	//[MCPInformation]
	//Count=180
	offset := 1 //MCP info starts at line 2.
	for mcp := 0; mcp < 179; mcp++{
		newMCP := models.MCP{}
		s := reflect.ValueOf(&newMCP).Elem()
		for i:=0; i < s.NumField(); i++ {
			s.Field(i).SetString(strings.Split(lines[mcp*s.NumField()+offset+i], "=")[1])
		}

	}
	println("Last MCP info: ", lines[180*19 +offset -1]) // should be: MCPActivityC180=

}
