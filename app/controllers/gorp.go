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
//Params:
//Returns:
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
	setColumnSizes(t, map[string]int{
		"Username": 20,
		"Name":     100,
	})


	// Set up database tracing for errors
	Dbm.TraceOn("[gorp]", r.INFO)

	// Create the Table
	Dbm.CreateTables()

	// Make a temporary user demo (pass demo)
	// Hash/encrypt the temp user password
	bcryptPassword, _ := bcrypt.GenerateFromPassword(
		[]byte("demo"), bcrypt.DefaultCost)
	demoUser := &models.User{0, "Demo User", "demo", "demo", bcryptPassword}
	if err := Dbm.Insert(demoUser); err != nil {
		panic(err)
	}
}

type GorpController struct {
	*r.Controller
	Txn *gorp.Transaction
}

func (c *GorpController) Begin() r.Result {
	txn, err := Dbm.Begin()
	if err != nil {
		panic(err)
	}
	c.Txn = txn
	return nil
}

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
