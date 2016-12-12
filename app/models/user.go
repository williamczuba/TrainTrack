package models

import (
	"fmt"
	"github.com/revel/revel"
)

//Struct for the user
type User struct {
	UserId             	int
	FirstName          	string
	LastName	   	string
	StreetAddress	   	string
	City		   	string
	State	           	string
	Country		   	string
	Email		   	string
	Password           	string
	HashedPassword     	[]byte
	Approved	   	bool
	SecurityQuestion   	string
	SecureAnswer	   	string
	HashedSecureAnswer	[]byte
	Admin			bool
}

//Return the username as a string
func (u User) String() string {
	return fmt.Sprintf("User(%s)", u.Email)
}

//Only allow certain characters for a username (prevent sql injection)
//var userRegex = regexp.MustCompile("^\\w*$")

//Validate the user credentials (make sure the user info is valid)
func (user *User) Validate(v *revel.Validation) {
	v.Check(user.Email,
		//revel.Required{},
		revel.MaxSize{50},
		revel.MinSize{1},
		//revel.Match{userRegex},
	)

	//Call the validate password function
	ValidatePassword(v, user.Password).
		Key("user.Password")

	v.Check(user.StreetAddress,
		revel.MinSize{1},
		revel.MaxSize{100})
	v.Check(user.City,
		revel.MinSize{1},
		revel.MaxSize{100})
	v.Check(user.State,
		revel.MinSize{1},
		revel.MaxSize{50})
	v.Check(user.Country,
		revel.MinSize{1},
		revel.MaxSize{100})

	v.Check(user.FirstName,
		//revel.Required{},
		revel.MinSize{1},
		revel.MaxSize{100},
	)
	//validate the security question and answer
	v.Check(user.SecurityQuestion,
		//revel.Required{},
		revel.MinSize{1},
		revel.MaxSize{100})

	v.Check(user.SecureAnswer,
		//revel.Required{},
		revel.MinSize{1},
		revel.MaxSize{100})

	v.Check(user.LastName,
		//revel.Required{},
		revel.MinSize{1},
		revel.MaxSize{100})

}



//Validate the user password (since we don't store plain text passwords, we need to verify it separately)
func ValidatePassword(v *revel.Validation, password string) *revel.ValidationResult {
	return v.Check(password,
		//revel.Required{},
		revel.MaxSize{15},
		revel.MinSize{1})
}
