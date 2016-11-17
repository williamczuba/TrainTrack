// GENERATED CODE - DO NOT EDIT
package routes

import "github.com/revel/revel"


type tGorpController struct {}
var GorpController tGorpController


func (_ tGorpController) Begin(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("GorpController.Begin", args).Url
}

func (_ tGorpController) Commit(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("GorpController.Commit", args).Url
}

func (_ tGorpController) Rollback(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("GorpController.Rollback", args).Url
}


type tTestRunner struct {}
var TestRunner tTestRunner


func (_ tTestRunner) Index(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("TestRunner.Index", args).Url
}

func (_ tTestRunner) Suite(
		suite string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "suite", suite)
	return revel.MainRouter.Reverse("TestRunner.Suite", args).Url
}

func (_ tTestRunner) Run(
		suite string,
		test string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "suite", suite)
	revel.Unbind(args, "test", test)
	return revel.MainRouter.Reverse("TestRunner.Run", args).Url
}

func (_ tTestRunner) List(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("TestRunner.List", args).Url
}


type tStatic struct {}
var Static tStatic


func (_ tStatic) Serve(
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.Serve", args).Url
}

func (_ tStatic) ServeModule(
		moduleName string,
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "moduleName", moduleName)
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.ServeModule", args).Url
}


type tApp struct {}
var App tApp


func (_ tApp) Index(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("App.Index", args).Url
}

func (_ tApp) AppPending(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("App.AppPending", args).Url
}

func (_ tApp) SaveUser(
		user interface{},
		verifyPassword string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "user", user)
	revel.Unbind(args, "verifyPassword", verifyPassword)
	return revel.MainRouter.Reverse("App.SaveUser", args).Url
}

func (_ tApp) Login(
		email string,
		password string,
		remember bool,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "email", email)
	revel.Unbind(args, "password", password)
	revel.Unbind(args, "remember", remember)
	return revel.MainRouter.Reverse("App.Login", args).Url
}

func (_ tApp) Logout(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("App.Logout", args).Url
}

func (_ tApp) AddUser(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("App.AddUser", args).Url
}

func (_ tApp) RecoverPassword(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("App.RecoverPassword", args).Url
}

func (_ tApp) ShowRecoveryQuestion(
		email string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "email", email)
	return revel.MainRouter.Reverse("App.ShowRecoveryQuestion", args).Url
}

func (_ tApp) RecoverInfo(
		email string,
		recoveryAnswer string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "email", email)
	revel.Unbind(args, "recoveryAnswer", recoveryAnswer)
	return revel.MainRouter.Reverse("App.RecoverInfo", args).Url
}

func (_ tApp) ShowInfo(
		email string,
		temp string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "email", email)
	revel.Unbind(args, "temp", temp)
	return revel.MainRouter.Reverse("App.ShowInfo", args).Url
}


type tMap struct {}
var Map tMap


func (_ tMap) Index(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("Map.Index", args).Url
}

func (_ tMap) Join(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("Map.Join", args).Url
}

func (_ tMap) Listen(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("Map.Listen", args).Url
}

func (_ tMap) Leave(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("Map.Leave", args).Url
}

func (_ tMap) Settings(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("Map.Settings", args).Url
}

func (_ tMap) SaveSettings(
		password string,
		verifyPassword string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "password", password)
	revel.Unbind(args, "verifyPassword", verifyPassword)
	return revel.MainRouter.Reverse("Map.SaveSettings", args).Url
}


type tAdmin struct {}
var Admin tAdmin


func (_ tAdmin) Dash(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("Admin.Dash", args).Url
}

func (_ tAdmin) Approve(
		UserId int,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "UserId", UserId)
	return revel.MainRouter.Reverse("Admin.Approve", args).Url
}


