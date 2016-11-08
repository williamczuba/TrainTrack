package models

import "fmt"

type MCP struct {
//	MCPAddress49=75505510040101
	Address 		string
//MCPName49=Walnut c/c
	Name			string
//MCPMilepost49=58.6
	Milepost		string
//MCPControlMessageNo49=
	ControlMessageNo	string
//MCPControlBits49=0
	ControlBits		string
//MCPControlMnemonics49=2XZ,1OXZ,1XZ,2STZ,2EGZ,2WGZ,1RWZ,1NWZ,,,,,,3OXZ,3XZ,2OXZ
	ControlMnemonics	string
//MCPIndicationMessageNo49=
	IndicationMessageNo	string
//MCPIndicationBits49=0
	IndicationBits		string
//MCPIndicationMnemonics49=1OXK,SWXK,1LZK,TK,1WGK,2EGK,1RWK,1NWK,,,,,2OK,1OK,SWAK,,,,,,,,,
	IndicationMnemonics	string
//MCPSubdivision49=NS Harrisburg Line
	Subdivision		string
//MCPStateCounty49=PA, Berks/Reading
	StateCounty		string
//MCPFrequency49=897.9375
	Frequency		string
//MCPProtocol49=ATCS
	Protocol		string //should all be ATCS...
//MCPResetRoutes49=0
	ResetRoutes		string
//MCPLongitude49=755526W
	Longitude		string
//MCPLatitude49=402021N
	Latitude		string
//MCPUpdated49=2/9/2015 12:09:33 AM
	Updated			string
//MCPActivityI49=
	ActivityI		string
//MCPActivityC49=
	ActivityC		string
}

//Return the Address, Name, Subdivision
func (mcp *MCP) String() string {
	return fmt.Sprintf("Address(%s), Name(%s), Subdivision", mcp.Address, mcp.Name, mcp.Subdivision)
}


