package controllers

import "github.com/revel/revel"

func init() {
	print("InitDB...")

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
