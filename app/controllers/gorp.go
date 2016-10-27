package controllers

import (
	"golang.org/x/crypto/bcrypt"
	"database/sql"
	"github.com/go-gorp/gorp"
	_ "github.com/mattn/go-sqlite3"
	r "github.com/revel/revel"
	"github.com/revel/modules/db/app"
	"TrainTrack/app/models"
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
		"Admin":	  20,
		"SecurityQuestion": 100,
		"HashedSecureAnswer":100,
	})


	// Set up database tracing for errors
	Dbm.TraceOn("[gorp]", r.INFO)

	// Create the Table
	Dbm.CreateTables()

	// Make a temporary user demo (pass demo)
	// Hash/encrypt the temp user password
	bcryptPassword, _ := bcrypt.GenerateFromPassword(
		[]byte("demo"), bcrypt.DefaultCost)
	bcryptSecureAnswer, _ := bcrypt.GenerateFromPassword(
		[]byte("demo"), bcrypt.DefaultCost)
	demoUser := &models.User{0, "FirstName", "Last", "St. Address", "City", "State", "Country", "demo", "demo", bcryptPassword, false, "What is this?", "demo", bcryptSecureAnswer}
	if err := Dbm.Insert(demoUser); err != nil {
		panic(err)
	}

	println("DEMO Question: ", demoUser.SecurityQuestion)
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
