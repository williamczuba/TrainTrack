package models

import (
	"fmt"

	"strings"
	"errors"
)

type Mcp struct {
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

//TODO
func NewMCP(str []string) (*Mcp, error) {

	//TODO: WILL need to have a string pattern recognizer.  Indexing is not working, there must be a typo.

	//mcp := Mcp{"","","","","","","","","","","","","","","","","","",""}
	data := make([]string, len(str))

	// Check for errors
	if !strings.Contains(str[0], "MCPAddress") {
		sA := ""
		for i:= 0; i < len(str); i++ {
			sA += str[i] + "\n"
		}
		s:= fmt.Sprintf("%s is not an address.  Lines given: \n %s \n", str[0], sA)
		return nil, errors.New(s)
	}
	for i:=0; i < len(str); i++ {
		val := strings.Split(str[i], "=")
		if len(val) == 2 {
			data[i] = val[1]
		} else {
			data[i] = ""
		}
	}
	mcp := Mcp{data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9],data[10],data[11],data[12],data[13],data[14],data[15],data[16],data[17],data[18]}

	//ms := new(Mcp)
	//msValuePtr := reflect.ValueOf(&mcp)
	//msValue := msValuePtr.Elem()
	//for i := 0; i < msValue.NumField(); i++ {
	//	field := msValue.Field(i)
	//	val := strings.Split(data[i], "=")
		//if len(val) == 2 {
		//	field.SetString(val[1])
		//} else {
		//	field.SetString(data[i])
		//}
	//}


	//s := reflect.ValueOf(&mcp).Elem()
	//for i:=0; i < len(data)-1; i++ {
	//	//val := strings.Split(data[i], "=")[1]
	//	val := data[i]
	//	s.Field(i).SetString(val)
	//
	//	println(val)
	//}
	//println((&mcp).String())
	//var ret Mcp
	//ret = mcp
	return &mcp, nil
}

//Return the Address, Name, Subdivision
func (mcp *Mcp) String() string {
	return fmt.Sprintf("Address: %s \n Name: %s \n Subdivision: %s ", mcp.Address, mcp.Name, mcp.Subdivision)
}


