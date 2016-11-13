package models

import "fmt"

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

//Return the Address, Name, Subdivision
func (mcp *Mcp) String() string {
	return fmt.Sprintf("Address(%s), Name(%s), Subdivision", mcp.Address, mcp.Name, mcp.Subdivision)
}


