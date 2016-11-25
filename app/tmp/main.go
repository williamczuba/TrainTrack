// GENERATED CODE - DO NOT EDIT
package main

import (
	"flag"
	"reflect"
	"github.com/revel/revel"
	_ "TrainTrack/app"
	controllers "TrainTrack/app/controllers"
	models "TrainTrack/app/models"
	tests "TrainTrack/tests"
	_ "github.com/mattn/go-sqlite3"
	controllers1 "github.com/revel/modules/static/app/controllers"
	_ "github.com/revel/modules/testrunner/app"
	controllers0 "github.com/revel/modules/testrunner/app/controllers"
	"github.com/revel/revel/testing"
)

var (
	runMode    *string = flag.String("runMode", "", "Run mode.")
	port       *int    = flag.Int("port", 0, "By default, read from app.conf")
	importPath *string = flag.String("importPath", "", "Go Import Path for the app.")
	srcPath    *string = flag.String("srcPath", "", "Path to the source root.")

	// So compiler won't complain if the generated code doesn't reference reflect package...
	_ = reflect.Invalid
)

func main() {
	flag.Parse()
	revel.Init(*runMode, *importPath, *srcPath)
	revel.INFO.Println("Running revel server")
	
	revel.RegisterController((*controllers.GorpController)(nil),
		[]*revel.MethodType{
			&revel.MethodType{
				Name: "Begin",
				Args: []*revel.MethodArg{ 
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			&revel.MethodType{
				Name: "Commit",
				Args: []*revel.MethodArg{ 
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			&revel.MethodType{
				Name: "Rollback",
				Args: []*revel.MethodArg{ 
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			
		})
	
	revel.RegisterController((*controllers0.TestRunner)(nil),
		[]*revel.MethodType{
			&revel.MethodType{
				Name: "Index",
				Args: []*revel.MethodArg{ 
				},
				RenderArgNames: map[int][]string{ 
					72: []string{ 
						"testSuites",
					},
				},
			},
			&revel.MethodType{
				Name: "Suite",
				Args: []*revel.MethodArg{ 
					&revel.MethodArg{Name: "suite", Type: reflect.TypeOf((*string)(nil)) },
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			&revel.MethodType{
				Name: "Run",
				Args: []*revel.MethodArg{ 
					&revel.MethodArg{Name: "suite", Type: reflect.TypeOf((*string)(nil)) },
					&revel.MethodArg{Name: "test", Type: reflect.TypeOf((*string)(nil)) },
				},
				RenderArgNames: map[int][]string{ 
					125: []string{ 
					},
				},
			},
			&revel.MethodType{
				Name: "List",
				Args: []*revel.MethodArg{ 
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			
		})
	
	revel.RegisterController((*controllers1.Static)(nil),
		[]*revel.MethodType{
			&revel.MethodType{
				Name: "Serve",
				Args: []*revel.MethodArg{ 
					&revel.MethodArg{Name: "prefix", Type: reflect.TypeOf((*string)(nil)) },
					&revel.MethodArg{Name: "filepath", Type: reflect.TypeOf((*string)(nil)) },
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			&revel.MethodType{
				Name: "ServeModule",
				Args: []*revel.MethodArg{ 
					&revel.MethodArg{Name: "moduleName", Type: reflect.TypeOf((*string)(nil)) },
					&revel.MethodArg{Name: "prefix", Type: reflect.TypeOf((*string)(nil)) },
					&revel.MethodArg{Name: "filepath", Type: reflect.TypeOf((*string)(nil)) },
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			
		})
	
	revel.RegisterController((*controllers.App)(nil),
		[]*revel.MethodType{
			&revel.MethodType{
				Name: "Index",
				Args: []*revel.MethodArg{ 
				},
				RenderArgNames: map[int][]string{ 
					32: []string{ 
					},
				},
			},
			&revel.MethodType{
				Name: "AppPending",
				Args: []*revel.MethodArg{ 
				},
				RenderArgNames: map[int][]string{ 
					43: []string{ 
					},
				},
			},
			&revel.MethodType{
				Name: "SaveUser",
				Args: []*revel.MethodArg{ 
					&revel.MethodArg{Name: "user", Type: reflect.TypeOf((*models.User)(nil)) },
					&revel.MethodArg{Name: "verifyPassword", Type: reflect.TypeOf((*string)(nil)) },
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			&revel.MethodType{
				Name: "Login",
				Args: []*revel.MethodArg{ 
					&revel.MethodArg{Name: "email", Type: reflect.TypeOf((*string)(nil)) },
					&revel.MethodArg{Name: "password", Type: reflect.TypeOf((*string)(nil)) },
					&revel.MethodArg{Name: "remember", Type: reflect.TypeOf((*bool)(nil)) },
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			&revel.MethodType{
				Name: "Logout",
				Args: []*revel.MethodArg{ 
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			&revel.MethodType{
				Name: "AddUser",
				Args: []*revel.MethodArg{ 
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			&revel.MethodType{
				Name: "RecoverPassword",
				Args: []*revel.MethodArg{ 
				},
				RenderArgNames: map[int][]string{ 
					221: []string{ 
					},
				},
			},
			&revel.MethodType{
				Name: "ShowRecoveryQuestion",
				Args: []*revel.MethodArg{ 
					&revel.MethodArg{Name: "email", Type: reflect.TypeOf((*string)(nil)) },
				},
				RenderArgNames: map[int][]string{ 
					237: []string{ 
						"email",
						"question",
					},
				},
			},
			&revel.MethodType{
				Name: "RecoverInfo",
				Args: []*revel.MethodArg{ 
					&revel.MethodArg{Name: "email", Type: reflect.TypeOf((*string)(nil)) },
					&revel.MethodArg{Name: "recoveryAnswer", Type: reflect.TypeOf((*string)(nil)) },
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			&revel.MethodType{
				Name: "ShowInfo",
				Args: []*revel.MethodArg{ 
					&revel.MethodArg{Name: "email", Type: reflect.TypeOf((*string)(nil)) },
					&revel.MethodArg{Name: "temp", Type: reflect.TypeOf((*string)(nil)) },
				},
				RenderArgNames: map[int][]string{ 
					277: []string{ 
						"email",
						"temp",
					},
				},
			},
			
		})
	
	revel.RegisterController((*controllers.Map)(nil),
		[]*revel.MethodType{
			&revel.MethodType{
				Name: "Index",
				Args: []*revel.MethodArg{ 
				},
				RenderArgNames: map[int][]string{ 
					36: []string{ 
					},
				},
			},
			&revel.MethodType{
				Name: "GetTrainData",
				Args: []*revel.MethodArg{ 
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			&revel.MethodType{
				Name: "Settings",
				Args: []*revel.MethodArg{ 
				},
				RenderArgNames: map[int][]string{ 
					110: []string{ 
					},
				},
			},
			&revel.MethodType{
				Name: "SaveSettings",
				Args: []*revel.MethodArg{ 
					&revel.MethodArg{Name: "password", Type: reflect.TypeOf((*string)(nil)) },
					&revel.MethodArg{Name: "verifyPassword", Type: reflect.TypeOf((*string)(nil)) },
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			
		})
	
	revel.RegisterController((*controllers.Admin)(nil),
		[]*revel.MethodType{
			&revel.MethodType{
				Name: "Dash",
				Args: []*revel.MethodArg{ 
				},
				RenderArgNames: map[int][]string{ 
					30: []string{ 
						"users",
					},
				},
			},
			&revel.MethodType{
				Name: "Approve",
				Args: []*revel.MethodArg{ 
					&revel.MethodArg{Name: "UserId", Type: reflect.TypeOf((*int)(nil)) },
				},
				RenderArgNames: map[int][]string{ 
				},
			},
			
		})
	
	revel.DefaultValidationKeys = map[string]map[int]string{ 
		"TrainTrack/app/controllers.App.SaveUser": { 
			103: "verifyPassword",
			104: "verifyPassword",
		},
		"TrainTrack/app/controllers.Map.SaveSettings": { 
			115: "verifyPassword",
			117: "verifyPassword",
		},
		"TrainTrack/app/models.(*User).Validate": { 
			43: "user.Email",
			51: "user.StreetAddress",
			54: "user.City",
			57: "user.State",
			60: "user.Country",
			66: "user.FirstName",
			71: "user.SecurityQuestion",
			76: "user.SecureAnswer",
			81: "user.LastName",
			84: "user.Admin",
		},
		"TrainTrack/app/models.ValidatePassword": { 
			95: "password",
		},
	}
	testing.TestSuites = []interface{}{ 
		(*tests.AppTest)(nil),
	}

	revel.Run(*port)
}
