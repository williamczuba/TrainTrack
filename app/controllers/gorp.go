package controllers

import (
	"golang.org/x/crypto/bcrypt"
	"database/sql"
	"github.com/go-gorp/gorp"
	_ "github.com/mattn/go-sqlite3"
	r "github.com/revel/revel"
	"github.com/revel/modules/db/app"
	"TrainTrack/app/models"
	"io/ioutil"
	"strings"
	"strconv"
	"reflect"
)

var (
	Dbm *gorp.DbMap
)


//Purpose: Initialize the Database Table
//Params: None
//Returns: Nothing
//Prints:
//	Nothing
func InitDB() {
	//Initialize the database (for the import)
	db.Init()

	//Get Sqlite
	Dbm = &gorp.DbMap{Db: db.Db, Dialect: gorp.SqliteDialect{}}

	// Function to set the columns for our Table
	setColumnSizes := func(t *gorp.TableMap, colSizes map[string]int) {
		for col, size := range colSizes {
			t.ColMap(col).MaxSize = size
		}
	}

	// Add the table to the Database with the key as the UserId
	t := Dbm.AddTable(models.User{}).SetKeys(true, "UserId")

	// Ensure the password is transient (we DONT save it)
	t.ColMap("Password").Transient = true

	// Set the column sizes for the username and name
	/*
	FirstName          string
	LastName	   string
	StreetAddress	   string
	City		   string
	State	           string
	Email		   string
	Password           string
	HashedPassword     []byte
	Admin		   bool
	 */
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
	// Set the column sizes for the username and name
	// Set up database tracing for errors
	//Dbm.TraceOn("[gorp]", r.INFO)

	// Create the Table
	//Dbm.CreateTables()
	/*
		Address 		string
	Name			string
	Milepost		string
	ControlMessageNo	string
	ControlBits		string
	ControlMnemonics	string
	IndicationMessageNo	string
	IndicationBits		string
	IndicationMnemonics	string
	Subdivision		string
	StateCounty		string
	Frequency		string
	Protocol		string //should all be ATCS...
	ResetRoutes		string
	Longitude		string
	Latitude		string
	Updated			string
	ActivityI		string
	ActivityC		string
}
	 */
	// Add the table to the Database with the key as the UserId
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

	// Set the column sizes for the username and name
	// Set up database tracing for errors
	Dbm.TraceOn("[gorp]", r.INFO)

	// Create the Table
	Dbm.CreateTables()


	//_, err := Dbm.TableFor(reflect.TypeOf(new(models.MCP)),false)
	//_, err := Dbm.Select(models.Mcp{}, `select * from Mcp`)
	//if(err!=nil){
	//	panic(err)
	//}

	// Make a temporary user demo (pass demo)
	// Hash/encrypt the temp user password
	bcryptPassword, _ := bcrypt.GenerateFromPassword(
		[]byte("demo"), bcrypt.DefaultCost)
	bcryptSecureAnswer, _ := bcrypt.GenerateFromPassword(
		[]byte("demo"), bcrypt.DefaultCost)
	demoUser := &models.User{
		UserId: 0,
		FirstName:  "demoF",
		LastName: "demoL",
		StreetAddress:  "St. Address",
		City: "City",
		State: "State",
		Country: "Country",
		Email: "demo",
		Password: "demo",
		HashedPassword: bcryptPassword,
		Approved: true,
		SecurityQuestion: "What is this?",
		SecureAnswer: "demo",
		HashedSecureAnswer: bcryptSecureAnswer,
		Admin: true,
	}
	if err := Dbm.Insert(demoUser); err != nil {
		panic(err)
	}
	bcryptPassword, _ = bcrypt.GenerateFromPassword(
		[]byte("trust"), bcrypt.DefaultCost)
	trustMe := &models.User{1, "trustF", "trustL", "St. Address", "City", "State", "Country", "trust", "trust", bcryptPassword, false, "What is this?", "demo", bcryptSecureAnswer, false}
	if err := Dbm.Insert(trustMe); err != nil {
		panic(err)
	}
	println("Trustme: username:", trustMe.Email, " password:", trustMe.Password)
	println("DEMO Question: ", demoUser.SecurityQuestion)



	// Initialize the MCPDB every time.
	//var InitMCPDB func() = func() {
		bp := r.BasePath
		println(r.BasePath)

		fileBytes, err := ioutil.ReadFile(bp + "/public/NS Harrisburg Division - Version 14.8.mcp")
		if err != nil {
			panic(err)
		}
		fileAsString := string(fileBytes)
		lines := strings.Split(fileAsString, "\n")
		println("length of lines: ", strconv.Itoa(len(lines)))
		//[MCPInformation]
		//Count=180
		offset := 1 //MCP info starts at line 2.
		for mcp := 0; mcp < 179; mcp++{
			newMCP := models.Mcp{}
			s := reflect.ValueOf(&newMCP).Elem()
			for i:=0; i < s.NumField(); i++ {
				s.Field(i).SetString(strings.Split(lines[mcp*s.NumField()+offset+i], "=")[1])
			}
			err := Dbm.Insert(&newMCP)
			if err != nil{
				println("ERROR: ",err)
				panic(err)

			}

		}
		println("Last MCP info: ", lines[180*19 +offset -1]) // should be: MCPActivityC180=

	//}
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
