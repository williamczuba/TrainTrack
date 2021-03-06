// Admin controller to allow the extra admin functionality.
package controllers

import (
	"github.com/revel/revel"
	"TrainTrack/app/routes"
	"TrainTrack/app/models"
	"fmt"
)

//Admin struct
type Admin struct {
	App
}

//Serves the Admin Dashboard to the admin
func (c Admin) Dash() revel.Result {
	//Get all applicants who aren't approved
	users, err := c.Txn.Select(models.User{}, `select * from User where Approved = ?`, false)
	//Check for error
	if err != nil {
		panic(err)
	}

 	return c.Render(users)
}

//Updates a user from unapproved to approved if the Admin approves
//If the Admin rejects then the user is deleted
func (c Admin) Approve(UserId int) revel.Result {
	user := c.getUserById(UserId)

	if c.Params.Get("approve") == "Approve"  {
		user.Approved = true
		_, err := c.Txn.Update(user)
		//_, err := c.Txn.Exec("UPDATE User set Approved = ? where UserId = ?",
		//	true, UserId)
		if err != nil {
			fmt.Println("Issue Approving!")
			panic(err)
		}
	} else if c.Params.Get("reject") == "Reject" {
		// delete their user
		_, err := c.Txn.Delete(user)
		//_, err := c.Txn.Exec("DELETE FROM User WHERE UserId = ?;",
		//	UserId)
		if err != nil {
			fmt.Println("Issue Rejecting!")
			panic(err)
		}
	}

	// TODO. Use Ajax instead of rerouting.
	return c.Redirect(routes.Admin.Dash())
}

//Utility method to get the user as a model based on the userID
func (c App) getUserById(UserId int) *models.User {
	//Select from our database
	users, err := c.Txn.Select(models.User{}, `select * from User where UserId = ?`, UserId)
	//Check for error
	if err != nil {
		panic(err)
	}
	//Check to see if we got any results
	if len(users) == 0 {
		println("NO user with that UID: ", UserId)
		return nil // if none, then they don't exist
	}
	//otherwise return the result
	return users[0].(*models.User)
}
