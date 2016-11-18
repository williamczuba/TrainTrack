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


// Retrieve new train info
var getPackets = function() {
    console.log("HERE");

    $.ajax({
        url: waitMessages,
        success: function(events) {
            $(events).each(function() {
                display(this);
            });
            getPackets()
        },
        dataType: 'json'
    });

    console.log("HERE");

};

// Display the train data on the map.
var display = function(event) {
    var trainData = JSON.parse(event);
    console.log("TD", trainData);
};