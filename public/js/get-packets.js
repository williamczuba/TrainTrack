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
    //TODO : Fix the ajax.
    $.ajax({
        url: waitMessages,
        success: function(CTD) {
            // $(events).each(function() {
            //     display(this);
            // });
            display(CTD);
            getPackets();
        },
        dataType: 'json'
    });
};

var show = function () {
    
}

// Display the train data on the map.
var display = function(CTD) {
    console.log("HERE");
    var trainData = JSON.parse(CTD);
    console.log("Train Data", trainData);
};