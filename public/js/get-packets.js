/**
 * Created by wigywizzle on 11/17/16.
 */

/*
Name 			string	`json:name`
MilePost		string	`json:"mile_post"`
MessageType		string `json:"message_type"`
Mnemonics 		string `json:"mnemonics"`
Bits 			string `json:"bits"`
Subdivision		string	`json:"subdivision"`
StateCounty		string	`json:"state_county"`
CodeLineData		string	`json:"code_line_data"`
*/
var waitMessages = '/map/listen';


var show = function () {
    
};

// Display the train data on the map.
// var display = function(CTD) {
//     console.log("CTD", CTD);
// };

function getPackets() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // this.response is the object containing all train data to be displayed.
            // display(this.response);
            var data = JSON.parse(this.response);
            setTimeout(MCP(data),10); // Send the response to display the map
            getPackets();
        }
    };
    xhttp.open("GET", waitMessages);
    xhttp.send();

}