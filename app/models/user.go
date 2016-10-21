package models

import (
	"fmt"
	"github.com/revel/revel"
	"regexp"
)

//Struct for the user
type User struct {
	UserId             int
	Name               string
	Username, Password string
	HashedPassword     []byte
}

//Return the username as a string
func (u *User) String() string {
	return fmt.Sprintf("User(%s)", u.Username)
}

//Only allow certain characters for a username (prevent sql injection)
var userRegex = regexp.MustCompile("^\\w*$")

//Validate the user credentials (make sure the user info is valid)
func (user *User) Validate(v *revel.Validation) {
	v.Check(user.Username,
		revel.Required{},
		revel.MaxSize{15},
		revel.MinSize{4},
		revel.Match{userRegex},
	)

	//Call the validate password function
	ValidatePassword(v, user.Password).
		Key("user.Password")

	v.Check(user.Name,
		revel.Required{},
		revel.MaxSize{100},
	)
}

//Validate the user password (since we don't store plain text passwords, we need to verify it separately)
func ValidatePassword(v *revel.Validation, password string) *revel.ValidationResult {
	return v.Check(password,
		revel.Required{},
		revel.MaxSize{15},
		revel.MinSize{5},
	)
}
