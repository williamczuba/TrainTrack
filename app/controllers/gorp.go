// Controller to manage the Data base and its communication with our program.
package controllers
import (
	"database/sql"
	"github.com/go-gorp/gorp"
	_ "github.com/mattn/go-sqlite3"
	r "github.com/revel/revel"
	"TrainTrack/app/models"
	"fmt"
	"io/ioutil"
	"strings"
	"strconv"
)

// Global variable that stored the database object map
var (
	Dbm *gorp.DbMap
)


// Initialize the Database by importing the sqlite database file, and setting up the Columns.
// NOTE: This is where admins and MCP database info can be defined.
func InitDB() {
	// Base path for reading files
	bp := r.BasePath

	//Get Sqlite database file
	db, err := sql.Open("sqlite3", bp+"/tmpDb.bin")

	if err != nil {
		fmt.Println("Sql Open Fail")
		panic(err)
	}

	// set the Databse map
	Dbm = &gorp.DbMap{Db: db, Dialect: gorp.SqliteDialect{}}

	// Function to set the columns for our Table
	setColumnSizes := func(t *gorp.TableMap, colSizes map[string]int) {
		for col, size := range colSizes {
			t.ColMap(col).MaxSize = size
		}
	}

	// Add the user table to the Database
	t := Dbm.AddTable(models.User{}).SetKeys(true, "UserId")

	// Ensure the password is transient (we DONT save it)
	t.ColMap("Password").Transient = true

	// Set the column sizes for the username and name
	setColumnSizes(t, map[string]int{
		"FirstName":     100,		//changed from Username:20
		"LastName":      100,
		"StreetAddress": 100,
		"City":           100,
		"State":	  50,
		"Country":        100,
		"Email":	  50,
		//"Approved":	  20,
		"SecurityQuestion": 100,
		"HashedSecureAnswer":100,
	})


	// Do the same for the MCP
	t2 := Dbm.AddTable(models.Mcp{})//.SetKeys(true, "Address")

	setColumnSizes(t2, map[string]int{
		"Address":     100,		//changed from Username:20
		"Name":      100,
		"Milepost": 100,
		"ControlMessageNo":           100,
		"ControlBits":	  100,
		"ControlMnemonics":        100,
		"IndicationMessageNo":        100,
		"IndicationBits":        100,
		"IndicationMnemonics":        100,
		"Subdivision":        100,
		"StateCounty":        100,
		"Frequency":        100,
		"Protocol":        100,
		"ResetRoutes":        100,
		"Longitude":        100,
		"Latitude":        100,
		"Updated":        100,
		"ActivityI":	  100,
		"ActivityC":	  100,
	})

	// Set up database tracing for errors - commented our for production
	//Dbm.TraceOn("[gorp]", r.INFO)

	// Create the Table
	Dbm.CreateTables()


	// Should for whatever reason, the SQLite file is deleted, these need to be called to initialize the database with
	// 	the mcp data and testing user's.
	// Also - this is where the admin is defined.  To add more admins, simply add them here.
	//_, err := Dbm.TableFor(reflect.TypeOf(new(models.MCP)),false)
	//_, err := Dbm.Select(models.Mcp{}, `select * from Mcp`)
	//if(err!=nil){
	//	panic(err)
	//}

	// Make an admin

	// Hash/encrypt the temp user password
	//bcryptPassword, _ := bcrypt.GenerateFromPassword(
	//	[]byte("Gettysburg"), bcrypt.DefaultCost)
	//bcryptSecureAnswer, _ := bcrypt.GenerateFromPassword(
	//	[]byte("RodPass"), bcrypt.DefaultCost)
	//demoUser := &models.User{
	//	UserId: 0,
	//	FirstName:  "Rod",
	//	LastName: "Tosten",
	//	StreetAddress:  "Doesn't matter",
	//	City: "City",
	//	State: "State",
	//	Country: "Country",
	//	Email: "RodTosten",
	//	Password: "Gettysburg",
	//	HashedPassword: bcryptPassword,
	//	Approved: true,
	//	SecurityQuestion: "Who shall pass?",
	//	SecureAnswer: "RodPass",
	//	HashedSecureAnswer: bcryptSecureAnswer,
	//	Admin: true,
	//}
	//
	//if err := Dbm.Insert(demoUser); err != nil {
	//	panic(err)
	//}

	 //Create a test user.

	//bcryptPassword, _ = bcrypt.GenerateFromPassword(
	//	[]byte("trust"), bcrypt.DefaultCost)
	//trustMe := &models.User{1, "trustF", "trustL", "St. Address", "City", "State", "Country", "trust", "trust", bcryptPassword, false, "What is this?", "demo", bcryptSecureAnswer, false}
	//if err := Dbm.Insert(trustMe); err != nil {
	//	panic(err)
	//}


	 //Initialize the MCP DB

	//fileBytes, err := ioutil.ReadFile(bp + "/public/NS Harrisburg Division - Version 14.8.mcp")
	//if err != nil {
	//	panic(err)
	//}
	//fileAsString := string(fileBytes)
	//lines := strings.Split(fileAsString, "\n")
	//newMCP := new(models.Mcp)
	//for i:= 2; i+19 <= len(lines); i+= 19 {
	//	newMCP, err = models.NewMCP(lines[i:i+19])
	//	if err != nil {
	//		//fmt.Println("Error: ", err)
	//		panic(err)
	//	}
	//	err := Dbm.Insert(newMCP)
	//	if err != nil{
	//		panic(err)
	//	}
	//}
}
//Initialize the MCPDB.  Note this doesn't need to be called again since the MCP DB will be imported from the tmpDb.bin now.
// This was used to convert the NS Harrisburg Division - Verison 14.8.mcp (Which was converted from ISO to UTF-8! this is important since golang reads files as UTF-8.)
// 	into an sqlite database.
func initMCPDB() {

	bp := r.BasePath
	fileBytes, err := ioutil.ReadFile(bp + "/public/NS Harrisburg Division - Version 14.8.mcp")
	if err != nil {
		panic(err)
	}
	fileAsString := string(fileBytes)
	lines := strings.Split(fileAsString, "\n")
	println("length of lines: ", strconv.Itoa(len(lines)))
	newMCP := new(models.Mcp)
	for i:= 2; i+19 <= len(lines); i+= 19 {
		newMCP, err = models.NewMCP(lines[i:i+19])
		if err != nil {
			//fmt.Println("Error: ", err)
			panic(err)
		}
		err := Dbm.Insert(newMCP)
		if err != nil{
			panic(err)
		}
	}


}

//Gorp Controller that extends the revel controller and allows us to use gorp transactions with the DB
type GorpController struct {
	*r.Controller
	Txn *gorp.Transaction
}

//Start the database transaction and return the revel result (should be nil)
func (c *GorpController) Begin() r.Result {
	txn, err := Dbm.Begin()
	if err != nil {
		panic(err)
	}
	c.Txn = txn
	return nil
}

//Commit the changes to the database and return the revel result (should be nil)
func (c *GorpController) Commit() r.Result {
	if c.Txn == nil {
		return nil
	}
	if err := c.Txn.Commit(); err != nil && err != sql.ErrTxDone {
		panic(err)
	}
	c.Txn = nil
	return nil
}

//Rollback the changes to the databases and return the revel result (should be nil)
func (c *GorpController) Rollback() r.Result {
	if c.Txn == nil {
		return nil
	}
	if err := c.Txn.Rollback(); err != nil && err != sql.ErrTxDone {
		panic(err)
	}
	c.Txn = nil
	return nil
}
