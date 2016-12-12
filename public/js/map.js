//Javascript Code for drawing the map

/*Function to take in information we receive from the backend and make changes on the track accordingly.
The parameter 'TrainData' is what we receive from the backend.
*/
function MCP(TrainData){
	//Convert parameter from text to an object. This is why we couldn't access the 'name' field.
    var trainDataObj = JSON.parse(TrainData);
    var name = trainDataObj.Name;
	name = name.trim();

    //Find the MCP that corresponds to the name given
    var mcpData = mcpTable[key(name)];
    var segments = "";
	var controls = "";
    if (mcpData != undefined){
         segments = mcpData.segments;
    }
	//Clear the timer.
	if(mcpData.sTimeId != undefined){
    	window.clearTimeout(mcpData.sTimeId);
		mcpData.sTimeId = undefined;
    }
   	mcpData.sTimeId = setTimeout(resetTrack, mcpData.sTime, mcpData);
	mcpTable[key(mcpData.name)] = mcpData;
    var color = "";
    var msgType = trainDataObj.message_type;
    //Check if the message is a control
    if (msgType == "Control"){
        color = "green";
        mcpData.color = "green";
		controls = mcpData.controlPoints;
		//Reset control points after 1 minute
		window.clearTimeout(mcpData.cTimeId);
		mcpData.cTimeId = setTimeout(resetPoints, mcpData.cTime, mcpData);
		for (var j = 0; j < controls.length; j++){
			changePoint(controls[j]);
		}
    }
    //Check if the message is an indication
    else if (msgType == "Indication"){
        color = "red";
        mcpData.color = "red";
    }
    //Update the value in the hash table to include the new settings
    mcpTable[key(name)] = mcpData;
    for (var i = 0; i < segments.length; i++){
        changeTrack(segments[i], color);
    }
};

//Global variable to keep track of whether or not the hash map is filled with the MCPs from Lurgan to Ship
var ltsFilled = false;
//Global variable to keep track of whether or not the hash map is filled with the MCPs from Ship to Front
var stfFilled = false;

//Global hash table for storing the mnemonics that correspond to their track segments
var mcpTable = {};

//Load Control Point images as global variables
var cproff = new Image();
cproff.src = "/public/img/cproff.png";
var cploff = new Image();
cploff.src = "/public/img/cploff.png";
var cpron = new Image();
cpron.src = "/public/img/cpron.png";
var cplon = new Image();
cplon.src = "/public/img/cplon.png";

/* This function creates the hash key from the MCP name. The name refers to an MCP object, which holds the MCP
segments that will need to be colored. The function takes 11, a prime number, and multiplies that by 53 before adding the ASCII
code of each letter in the name. This creates a unique key.

The hash map is set-up according to what I found here: http://stackoverflow.com/questions/368280/javascript-hashmap-equivalent,
but with a different hash function. 
*/
var key = function(mcpName){
    var hash = 11;
	for (var i = 0; i < mcpName.length; i++){
        hash = hash * 53 + mcpName.charCodeAt(i);
	}
	return hash;
};

//Function to determine the font size, based on the size of the window
function getFont(fontSize, fontBase, canvas) {
	var smallestVal = canvas.width;

	if (smallestVal >= 1500) {
		return (1.5 * fontSize) | 0;//1.5 is the max size. otherwise things run into each other.
	}
	var ratio = fontSize / fontBase;   // calc ratio
	var size = smallestVal * ratio;   // get font size based on current width
	if(size < 0.5) {
		return 12;
	}
	return (size | 0); //+ 'em sans-serif'; // set font
}

//Functions for creating the track segments
//Draws Lurgan to SHIP segment
var drawLurganToShip = function(){
};


//Draws the labels from Lurgan to Ship
drawLurganToShip.prototype.drawLTSText = function (canvas, ctx){

		// Draw Text
		var fontBase = 1080, // selected default width for canvas
		fontSize = 12; // default size for font 
		ctx.font = getFont(fontSize, fontBase, canvas) + 'px sans-serif';
		//Orange, size 12
		ctx.fillStyle = "#ffa500";
		ctx.fillText("Lurgan Sub", 0.01*canvas.width, 0.485*canvas.height);
		ctx.fillText("NS H-Line", 0.01*canvas.width, 0.53*canvas.height);
		ctx.fillText("to Roanoke", 0.01*canvas.width, 0.55*canvas.height);
		ctx.fillText("Lurgan Branch", .796*canvas.width, 0.48*canvas.height);
		ctx.fillText("to Ship", .796*canvas.width, 0.495*canvas.height);
		//Gray, size 12
		ctx.fillStyle = "#d3d3d3";
		ctx.fillText("TOWN", 0.190*canvas.width, 0.57*canvas.height);
		ctx.fillText("CP-67", 0.44*canvas.width, 0.5*canvas.height);
		ctx.fillText("CP-65", 0.52*canvas.width, 0.5*canvas.height);
		ctx.fillText("CP-64", 0.576*canvas.width, 0.56*canvas.height);
		ctx.fillText("CP-62", 0.62*canvas.width, 0.57*canvas.height);
		ctx.fillText("CP-53", 0.76*canvas.width, 0.57*canvas.height);
		ctx.fillText("CP-50", 0.84*canvas.width, 0.57*canvas.height);
		// Orange, size 10
		var fontSize = 10;
		ctx.font = getFont(fontSize, fontBase, canvas) + 'px sans-serif';
		ctx.fillStyle = "#ffa500";
		ctx.fillText("NS Industrial Lead", 0.402*canvas.width, 0.610*canvas.height);
		ctx.fillText("CSX Lurgan Sub", 0.402*canvas.width, 0.57*canvas.height);
		ctx.fillText("CSX Hanover Sub", 0.402*canvas.width, 0.59*canvas.height);
		ctx.fillText("Greencastle Yard", 0.51*canvas.width, 0.58*canvas.height);
		return this;
};

//Draw the segments of the track from Lurgan to Ship
drawLurganToShip.prototype.drawLTSTrack = function(canvas, ctx){
		// Draw Track - Nearby text on original layout listed in comments
		// Town Segments - goes up to SEA
		//Town section -- 17 lines
		// CSX
		var csx_straight = createTrack(.116, .470, .186, .470, canvas);
		var csx_ramp = createTrack(.1861, .470, .206, .485, canvas);
		// Lurgan Sub
		var lurgan_straight = createTrack(.116, .495, .226, .495, canvas);
		var lurgan_ramp = createTrack(.2261, .495, .286, .535, canvas);
	    // NS Industrial Lead
		var nsi_ramp = createTrack(.266, .540, .336, .600, canvas);
		var nsi_straight = createTrack(.3361, .600, .400, .600, canvas);
		// CSX Lurgan Sub
		var csxl_ramp = createTrack(.310, .540, .336, .560, canvas);
		var csxl_straight = createTrack(.3361, .560, .400, .560, canvas);
		// CSX Hanover Sub
		var csxh_ramp = createTrack(.360, .560, .386, .580, canvas);
		var csxh_straight = createTrack(.3861, .580, .400, .580, canvas);
		// NS Industrial Lead
		var nsh_straight = createTrack(.116, .520, .196, .520, canvas);
		var nsh_ramp = createTrack(.1961, .520, .216, .535, canvas);
		// CSX Hanover Sub
		var csxh_ramp = createTrack(.360, .560, .386, .580, canvas);
		var csxh_straight = createTrack(.3861, .580, .400, .580, canvas);
		// From "to Roanoke" to SSA
		var roanoke_to_ssa = createTrack(.116, .540, .400, .540, canvas);
		var town_segments = [csx_straight, csx_ramp, lurgan_straight, lurgan_ramp, nsi_ramp, nsi_straight, csxl_ramp,
							 csxl_straight, csxh_ramp, csxh_straight, nsh_straight, nsh_ramp, nsi_ramp, nsi_straight,
							roanoke_to_ssa];

		//CP-67 -- 4 lines
		var sea_to_1t = createTrack(.400, .540, .470, .540, canvas);
		var o1 = createTrack(.470, .540, .500, .540, canvas);
		var gc_ramp_l = createTrack(.440, .540, .466, .560, canvas);
		var gc_straight_to_3sea = createTrack(.4661, .560, .500, .560, canvas);
		var cp67_segments = [sea_to_1t, o1, gc_ramp_l, gc_straight_to_3sea];
        // CP-65 -- 3 lines
		var cp65_bottom_straight = createTrack(.500, .540, .560, .540, canvas);
		var cp65_top_straight1 = createTrack(.5361, .520, .583, .520, canvas);
		var cp65_ramp_1 = createTrack(.510, .540, .536, .520, canvas);
	    var cp65_segments = [cp65_bottom_straight, cp65_ramp_1, cp65_top_straight1];
		// CP-64 -- 3 lines
		var gc_ramp_r = createTrack(.5601, .560, .586, .540, canvas);
		var cp64_bottom_straight = createTrack(.560, .540, .620, .540, canvas);
	    var gc_straight_remaining = createTrack(.500, .560, .560, .560, canvas); // from CP-67
		var cp64_segments = [cp64_bottom_straight, gc_ramp_r, gc_straight_remaining];
        //CP-62 -- 3 lines
    	var cp62_top_straight2 = createTrack(.5831, .520,  .630, .520, canvas);
	    var cp62_ramp_r = createTrack(.6301, .520, .656, .540, canvas);
	    var cp62_bottom_straight = createTrack(.620, .540, .700, .540, canvas);
        var cp62_segments = [cp62_top_straight2, cp62_ramp_r, cp62_bottom_straight];
        //CP-53 -- 3 lines
        var cp53_straight = createTrack(.700, .540, .815, .540, canvas);
		var cp53_ramp_l = createTrack(.770, .540, .796, .520, canvas);
		var cp53_top_straight = createTrack(.7961, .520, .815, .520, canvas);
		var cp53_segments = [cp53_straight, cp53_ramp_l, cp53_top_straight];
        //CP - 50 -- 3 lines
		var cp50_straight_top = createTrack(.8151, .520, .826, .520, canvas);
		var cp50_ramp_r = createTrack(.8261, .520, .850, .540, canvas);
        var cp50_straight_bottom = createTrack(.700, .540, .905, .540, canvas)
        var cp50_segments = [cp50_straight_top, cp50_ramp_r, cp50_straight_bottom];

        //Only recreate the MCPs and add them to the hash map if this is the initialization stage
        if (!ltsFilled){
            var town = createMCP("Town", town_segments);
            mcpTable[key(town.name)] = town;

            var cp67 = createMCP("CP-67", cp67_segments);
            mcpTable[key(cp67.name)] = cp67;

            var cp65 = createMCP("CP-65", cp65_segments);
            mcpTable[key(cp65.name)] = cp65;

            var cp64 = createMCP("CP-64", cp64_segments);
            mcpTable[key(cp64.name)] = cp64;

            var cp62 = createMCP("CP-62", cp62_segments);
            mcpTable[key(cp62.name)] = cp62;

            var cp53 = createMCP("CP-53", cp53_segments);
            mcpTable[key(cp53.name)] = cp53;

            var cp50 = createMCP("CP-50", cp50_segments);
            mcpTable[key(cp50.name)] = cp50;

            ltsFilled = true;
        }
		return this;
};

/*
Creates control points for the Lurgan to Ship region. Control points contain their location, their mnemonic, and the
track mnemonics they control.
to hold track and CP mnemonics.
*/
drawLurganToShip.prototype.drawLTSControlPoints = function(canvas, ctx){
	// TOWN control points
	var ng6rw9 = createControlPoint(.17, .474, "1:6NG/9RW", canvas, cproff);
	var ng6nw9 = createControlPoint(.17, .501, "1:6NG/9NW", canvas, cproff);
	var ng2rw7 = createControlPoint(.17, .523, "1:2NG7RW", canvas, cproff);
	var ng2nw7 = createControlPoint(.17, .546, "1:2NG/7NW", canvas, cproff);
	var sg2 = createControlPoint(.383, .524, "1:2SG", canvas, cploff);
	var sg6nw2 = createControlPoint(.383, .544, "1:6SG/2NW", canvas, cploff);
	var sg6rw2 = createControlPoint(.383, .564, "1:6SG/2RW", canvas, cploff);
	var sg4 = createControlPoint(.383, .584, "1:4SG", canvas, cploff);
	var townCP = [ng6rw9, ng6nw9, ng2rw7, ng2nw7, sg2, sg6nw2, sg6rw2, sg4]
	var town = mcpTable[key("Town")];
	town.controlPoints = townCP;
	// CP-67 - CP-62 Control Points
	var eg22 = createControlPoint(.423, .545, "2:2EG", canvas, cproff);
	var wg2nw12 = createControlPoint(.470, .523, "2:2WG/1NW", canvas, cploff);
	var wg2rw12 = createControlPoint(.470, .543, "2:2WG/1RW", canvas, cploff);
	var cp67CP = [eg22, wg2nw12, wg2rw12];
	var cp67 = mcpTable[key("CP-67")];
	cp67.controlPoints = cp67CP;
	var eg20 = createControlPoint(.500, .543, "0:2EG", canvas, cproff);
	var wg2nw10 = createControlPoint(.540, .501, "0:2WG/1NW", canvas, cploff);
	var wg2rw10 = createControlPoint(.540, .523, "0:2WG/1RW", canvas, cploff);
	var cp65CP = [eg20, wg2nw10, wg2rw10];
	var cp65 = mcpTable[key("CP-65")];
	cp65.controlPoints = cp65CP;
	var eg2nw13 = createControlPoint(.550, .543, "3:2WG/1NW", canvas, cproff);
	var eg2rw13 = createControlPoint(.550, .563, "3:2WG/1NW", canvas, cproff);
	var wg23 = createControlPoint(.590, .522, "3:2WG", canvas, cploff);
	var cp64CP = [eg2nw13, eg2rw13, wg23];
	var cp64 = mcpTable[key("CP-64")];
	cp64.controlPoints = cp64CP;
	var eg2rw14 = createControlPoint(.620, .522, "4:2EG/1RW", canvas, cproff);
	var eg2nw14 = createControlPoint(.620, .543, "4:2EG/1NW", canvas, cproff);
	var wg24 = createControlPoint(.655, .522, "4:2WG", canvas, cploff);
	var cp62CP = [eg2rw14, eg2nw14, wg24];
	var cp62 = mcpTable[key("CP-62")];
	cp62.controlPoints = cp62CP;
	// CP-53 - CP-50 Control Points
	var ng25 = createControlPoint(.76, .543, "5:2NG", canvas, cproff);
	var sg2rw15 = createControlPoint(.8, .500, "5:2SG/1RW", canvas, cploff);
	var sg2nw15 = createControlPoint(.8, .524, "5:2SG/1NW", canvas, cploff);
	var cp53CP = [ng25, sg2rw15, sg2nw15];
	var cp53 = mcpTable[key("CP-53")];
	cp53.controlPoints = cp53CP;
	var ng2rw16 = createControlPoint(.820, .524, "6:2NG/1RW", canvas, cproff);
	var ng2nw16 = createControlPoint(.820, .545, "6:2NG/1NW", canvas, cproff);
	var sg26 = createControlPoint(.870, .523, "6:2SG", canvas, cploff);
	var cp50CP = [sg26, ng2rw16, ng2nw16];
	var cp50 = mcpTable[key("CP-50")];
	cp50.controlPoints = cp50CP;
	return this;
};

drawLurganToShip.prototype.draw = function(canvas, ctx){
		this.drawLTSTrack(canvas, ctx);
		this.drawLTSText(canvas, ctx);
		this.drawLTSControlPoints(canvas, ctx);
		return this;
};

var drawShipToFront = function (){
};

//Draws the labels on the track from Ship to Front
drawShipToFront.prototype.drawSTFText = function(canvas, ctx){
    // Draw Text
	// Orange, size 12
	// ctx.font = ("1em Arial");
	var fontBase = 1080; // selected default width for canvas
	var fontSize = 12;
	ctx.font = getFont(fontSize, fontBase, canvas) + 'px sans-serif';
	ctx.fillStyle = "#ffa500";
	ctx.fillText("to CP-50", canvas.width * .112, canvas.height * .30 );
	ctx.fillText ("Lurgan", canvas.width * .112, canvas.height * .190);
	ctx.fillText("Running", canvas.width * .112, canvas.height * .205);
	ctx.fillText("Track", canvas.width * .112, canvas.height * .220);
	ctx.fillText("Gettysburg RR", canvas.width * .415, canvas.height * .315);
    ctx.fillText("Lurgan Branch", canvas.width * .675, canvas.height * .2285);
    ctx.fillText("to", canvas.width * .945, canvas.height * .190);
    ctx.fillText("Paxton", canvas.width * .945, canvas.height * .210);
    ctx.fillText("to", canvas.width * .945, canvas.height * .28);
    ctx.fillText("Capitol", canvas.width * .945, canvas.height * .30);
	// Gray, size 12
    ctx.fillStyle = "#d3d3d3";
    ctx.fillText("SHIP", .155 * canvas.width, .28 * canvas.height);
    ctx.fillText("LEES CROSS ROADS", canvas.width * .245, .28 * canvas.height);
    ctx.fillText("CARL", .550 * canvas.width, .30 * canvas.height);
    ctx.fillText("SPRING", .596 * canvas.width, .30 * canvas.height);
    ctx.fillText("ROSS", .755 * canvas.width, .28 * canvas.height);
    ctx.fillText("FRONT", .860 * canvas.width, .28 * canvas.height);
    // Orange, size 10
	var fontSize = 10;
	ctx.font = getFont(fontSize, fontBase, canvas) + 'px sans-serif';
    // ctx.font = ("0.8em Arial");
    ctx.fillStyle = "#ffa500";
    ctx.fillText("PPG", .585 * canvas.width, .220 * canvas.height);
    //Gray, size 10
    ctx.fillStyle = "#d3d3d3";
    ctx.fillText("Cleversburg Junction", .22 * canvas.width, .189 * canvas.height);
    ctx.fillText("Viewing Platform", .23 * canvas.width, .205 * canvas.height);
    return this;
};

//Draws the track segments from Ship to Front
drawShipToFront.prototype.drawSTFTrack = function(canvas, ctx){
    //Ship -- 2 lines
    var ship_straight  = createTrack(.116, .255, .192, .255, canvas);
    var ship_top = createTrack(.148, .235, .192, .235, canvas);
    var ship_segments = [ship_straight, ship_top];
    //Lee -- 3 lines
    var lee_top = createTrack(.192, .235, .240, .235, canvas);
    var lee_ramp = createTrack(.240, .235, .260, .250, canvas);
    var lee_straight = createTrack(.192, .255, .416, .255, canvas);
    var lee_segments = [lee_top, lee_ramp, lee_straight];
    //Carl -- 7 lines
    var carl_straight = createTrack(.416, .255, .592, .255, canvas);
    var carl_ramp_l = createTrack(.524, .255, .544, .270, canvas);
    var carl_bottom_loop1 = createTrack(.544, .270, .592, .270, canvas);
    var gburg_bottom = createTrack(.476, .287, .522, .287, canvas);
    var gburg_ramp = createTrack(.5221, .287, .542, .270, canvas);
    var ppg_ramp = createTrack(.553, .251, .573, .234, canvas);
    var ppg_straight = createTrack(.573, .234, .589, .234, canvas);
    var carl_segments = [carl_straight, carl_ramp_l, carl_bottom_loop1, gburg_bottom, gburg_ramp, ppg_ramp, ppg_straight];
    //Spring section-- 4 lines
    var ppg_top = createTrackWithWidth(.589, .234, .604, .234, canvas, .5);
    var carl_bottom_loop2 = createTrack(.592, .270, .640, .270, canvas);
    var carl_ramp_r = createTrack(.640, .270, .660, .255, canvas);
    var spring_straight = createTrack(.592, .255, .752, .255, canvas);
    var spring_segments = [ppg_top, carl_bottom_loop2, carl_ramp_r, spring_straight];
    //Ross section-- 3 lines
    var ross_straight = createTrack(.752, .255, .896, .255, canvas);
    var ross_ramp = createTrack(.816, .25, .836, .235, canvas);
    var ross_top = createTrack(.836, .235, .868, .235, canvas);
    var ross_segments = [ross_straight, ross_ramp, ross_top];
    //Front section -- 2 lines
    var front_top = createTrack(.868, .235, .970, .235, canvas);
    var front_straight = createTrack(.896, .255, .970, .255, canvas);
    var front_segments = [front_top, front_straight];

    //Only recreate the MCPs and add them to the hash map if this is the initialization stage
    if (!stfFilled) {
         var ship = createMCP("Ship", ship_segments);
         mcpTable[key(ship.name)] = ship;

         var lee = createMCP("Lees Cross Roads", lee_segments);
         mcpTable[key(lee.name)] = lee;

         var carl = createMCP("Carl", carl_segments);
         mcpTable[key(carl.name)] = carl;

         var spring = createMCP("Spring", spring_segments);
         mcpTable[key(spring.name)] = spring;

         var ross = createMCP("Ross", ross_segments);
         mcpTable[key(ross.name)] = ross;

         var front = createMCP("Front", front_segments);
         mcpTable[key(front.name)] = front;

         stfFilled = true;
    }
    return this;
};

//Draw the control points from Ship to Front
drawShipToFront.prototype.drawSTFControlPoints = function (canvas, ctx){
    //Ship to Lee's Cross Roads
    var eg27 = createControlPoint(.155, .238, "7:2EG", canvas, cproff);
    var eg47 = createControlPoint(.155, .257, "7:4EG", canvas, cproff);
    var wg27 = createControlPoint(.180, .238, "7:2WG", canvas, cploff);
    var wg47 = createControlPoint(.180, .217, "7:4WG", canvas, cploff);
    var eg1rw28 = createControlPoint(.220, .238, "8:2EG/1RW", canvas, cproff);
    var eg1nw28 = createControlPoint(.220, .257, "8:2EG/1NW", canvas, cproff);
    var wg28 = createControlPoint(.265, .238, "8:2WG", canvas, cploff);
	var shipCP = [eg27, eg47, wg27, wg47];
	var leeCP = [eg1rw28, eg1nw28, wg28];
	var ship = mcpTable[key("Ship")];
	ship.controlPoints = shipCP;
	var lee = mcpTable[key("Lees Cross Roads")];
	lee.controlPoints = leeCP;
    //Carl to Spring
    var eg29 = createControlPoint(.490, .257, "9:2EG", canvas, cproff);
    var eg49 = createControlPoint(.490, .289, "9:4EG", canvas, cproff);
    var wg7rw29 = createControlPoint(.577, .217, "9:2WG/7RW", canvas, cploff);
    var wg7nw29 = createControlPoint(.577, .238, "9:2WG/7NW", canvas, cploff);
    var wg49 = createControlPoint(.577, .257, "9:4WG", canvas, cploff);
    var a2eg1nw = createControlPoint(.615, .257, "a:2EG/1NW", canvas, cproff);
    var a2eg1rw = createControlPoint(.615, .272, "a:2EG/1RW", canvas, cproff);
    var a2wg = createControlPoint(.665, .238, "a:2WG", canvas, cploff);
	var carlCP = [eg29, eg49, wg7rw29, wg7nw29, wg49];
	var springCP = [a2eg1nw, a2eg1rw, a2wg];
	var carl = mcpTable[key("Carl")]; 
	carl.controlPoints = carlCP;
	var spring = mcpTable[key("Spring")];
	spring.controlPoints = springCP;
    //Ross to Front
    var b2eg = createControlPoint(.780, .257, "b:2EG", canvas, cproff);
    var b2wg1rw = createControlPoint(.832, .217, "b:2WG/1RW", canvas, cploff);
    var b2wg1nw = createControlPoint(.832, .238, "b:2WG/1NW", canvas, cploff);
    var c2eg = createControlPoint(.890, .237, "c:2EG", canvas, cproff);
    var c4eg = createControlPoint(.890, .257, "c:4EG", canvas, cproff);
    var c2wg = createControlPoint(.940, .217, "c:2WG", canvas, cploff);
    var c4wg = createControlPoint(.940, .237, "c:4WG", canvas, cploff);
	var rossCP = [b2eg, b2wg1rw, b2wg1nw];
	var frontCP = [c2eg, c4eg, c2wg, c4wg];
	var ross = mcpTable[key("Ross")];
	ross.controlPoints = rossCP;
	var front = mcpTable[key("Front")];
	front.controlPoints = frontCP;
	return this;
};

drawShipToFront.prototype.draw = function(canvas, ctx){
		this.drawSTFTrack(canvas, ctx);
		this.drawSTFText(canvas, ctx);
		this.drawSTFControlPoints(canvas, ctx);
		return this;
};

//Functions for drawing and creating track elements
function createTrackWithWidth(x1, y1, x2, y2, canvas, lineWidth){
    var newCanvas = document.createElement("canvas");
	var parent = canvas.parentNode;
    	if (x2 >= x1){
    		newCanvas.width = (x2*canvas.width-x1*canvas.width);
    	}
    	else{
    		newCanvas.width = (x1*canvas.width-x2*canvas.width);
    		var xflip = true;
    	}
    	if (y2 >= y1){
    		newCanvas.height = (y2*canvas.height-y1*canvas.height);
    	}
    	else{
    		newCanvas.height = (y1*canvas.height-y2*canvas.height);
    		var yflip = true;
    	}
        if (x1 == x2){
    		var vLine = true;
    		newCanvas.width = 8;
        }
        else if (y1 == y2){
            var hLine = true;
    	    newCanvas.height = 8;
        }
    	var newCtx = newCanvas.getContext('2d');
    	var oldCtx = canvas.getContext('2d');
    	newCtx.strokeStyle = "white";
    	newCtx.lineWidth = lineWidth;
    	if (vLine == true){
    		newCtx.moveTo(lineWidth, 0);
    		newCtx.lineTo(lineWidth, newCanvas.height);
    		newCtx.stroke();
			parent.appendChild(canvas);
    		oldCtx.drawImage(newCanvas, x1*canvas.width-lineWidth, y1*canvas.height);
    	}
    	else if (hLine == true){
    		newCtx.moveTo(0, lineWidth);
    		newCtx.lineTo(newCanvas.width, lineWidth);
    		newCtx.stroke();
			parent.appendChild(canvas);
    		oldCtx.drawImage(newCanvas, x1*canvas.width, y1*canvas.height-lineWidth);
    	}
    	else if (yflip == true){
    		newCtx.moveTo(0, newCanvas.height);
    		newCtx.lineTo(newCanvas.width, 0);
    		newCtx.stroke();
			parent.appendChild(canvas);
    		oldCtx.drawImage(newCanvas, x1*canvas.width, y2*canvas.height);
    	}
    	else if (xflip == true){
    		newCtx.moveTo(newCanvas.width, 0);
    		newCtx.lineTo(0, newCanvas.height);
    		newCtx.stroke();
			parent.appendChild(canvas);
    		oldCtx.drawImage(newCanvas, x2*canvas.width, y1*canvas.height);
    	}
    	else{
    		newCtx.moveTo(0, 0);
    		newCtx.lineTo(newCanvas.width, newCanvas.height);
    		newCtx.stroke();
			parent.appendChild(canvas);
    		oldCtx.drawImage(newCanvas, x1*canvas.width, y1*canvas.height);
    	}
    	var track = {
    		canvas: canvas,
    		ctx: oldCtx,
			nCanvas: newCanvas,
			x1: x1,
			x2: x2,
			y1: y1,
			y2: y2,
			lw: lineWidth,
			parent: canvas.parentNode
    	};
    	return track;
}

function createMCP(name, segments){
    var color = "white";
    var clearTime = 60000;
	var sTimeId = undefined;
	var cTimeId = undefined;
	var MCP = {
        name: name,
        segments: segments,
		controlPoints: undefined,
		sTime: clearTime,
		cTime: clearTime,
		sTimeId: sTimeId,
		cTimeId: cTimeId,
		color: color
    };
    return MCP;
};

/* Creates a new segment of track and an accompanying canvas, and returns it.
 track - the new segment of track
 */
function createTrack(x1, y1, x2, y2, canvas){
    var track = createTrackWithWidth(x1,y1, x2, y2, canvas, 4);
	return track;
};

// Creates a new control point using the given coordinates, image, and mnemonics.
function createControlPoint(x, y, cMnemonic, canvas, img){
	//Resize the MCP based on canvas size.
	var idealWidth = 1080;
	var idealHeight = 1250;
	var cWR = canvas.width/idealWidth;
	var cHR = canvas.height/idealHeight;
	var oldCtx = canvas.getContext('2d');
	$(img).load(function(){
		oldCtx.drawImage(img,  x*canvas.width, y*canvas.height, img.width*cWR,img.height*cHR);
	});
	var cp = {
		cm: cMnemonic,
		x: x,
		y: y,
		width: cWR,
		height: cHR,
		img: img,
		canvas: canvas
	}
	return cp;
};

// Redraws the given track element in the given color.
function changeTrack(track, color){
    var x1 = track.x1;
    var x2 = track.x2;
    var y1 = track.y1;
    var y2 = track.y2;
	var newCanvas = track.nCanvas
    var parent = track.parent;
    if (x2 >= x1){
        newCanvas.width = (x2*track.canvas.width-x1*track.canvas.width);
    }
    else{
        newCanvas.width = (x1*track.canvas.width-x2*track.canvas.width);
        var xflip = true;
    }
    if (y2 >= y1){
        newCanvas.height = (y2*track.canvas.height-y1*track.canvas.height);
    }
    else{
        newCanvas.height = (y1*track.canvas.height-y2*track.canvas.height);
        var yflip = true;
    }
    if (x1 == x2){
        var vLine = true;
        newCanvas.width = 8;
    }
    else if (y1 == y2){
         var hLine = true;
         newCanvas.height = 8;
    }
    var newCtx = newCanvas.getContext('2d');
    var oldCtx = track.canvas.getContext('2d');
    newCtx.strokeStyle = color;
	var lineWidth = track.lw;
    newCtx.lineWidth = lineWidth;
    if (vLine == true){
		newCtx.clearRect(0,0, newCanvas.width, newCanvas.height);
        newCtx.moveTo(lineWidth, 0);
        newCtx.lineTo(lineWidth, newCanvas.height);
        newCtx.stroke();
		oldCtx.drawImage(newCanvas, x1*track.canvas.width-lineWidth, y1*track.canvas.height);
    	parent.appendChild(track.canvas);
    }
    else if (hLine == true){
		newCtx.clearRect(0,0, newCanvas.width, newCanvas.height);
        newCtx.moveTo(0, lineWidth);
        newCtx.lineTo(newCanvas.width, lineWidth);
        newCtx.stroke();
		oldCtx.drawImage(newCanvas, x1*track.canvas.width, y1*track.canvas.height-lineWidth);
    	parent.appendChild(track.canvas);
     }
     else if (yflip == true){
		newCtx.clearRect(0,0, newCanvas.width, newCanvas.height);
        newCtx.moveTo(0, newCanvas.height);
        newCtx.lineTo(newCanvas.width, 0);
        newCtx.stroke();
		oldCtx.drawImage(newCanvas, x1*track.canvas.width, y2*track.canvas.height);
        parent.appendChild(track.canvas);
    }
    else if (xflip == true){
		newCtx.clearRect(0,0, newCanvas.width, newCanvas.height);
        newCtx.moveTo(newCanvas.width, 0);
        newCtx.lineTo(0, newCanvas.height);
        newCtx.stroke();
    	oldCtx.drawImage(newCanvas, x2*track.canvas.width, y1*track.canvas.height);
		parent.appendChild(track.canvas);

    }
    else{
		newCtx.clearRect(0,0, newCanvas.width, newCanvas.height);
        newCtx.moveTo(0, 0);
        newCtx.lineTo(newCanvas.width, newCanvas.height);
        newCtx.stroke();
		oldCtx.drawImage(newCanvas, x1*track.canvas.width, y1*track.canvas.height);
    	parent.appendChild(track.canvas);
     }
};

//Changes the state of the control point -- from red to green or green to red
function changePoint(cp){
	var idealWidth = 1080;
	var idealHeight = 1250;
	var canvas = cp.canvas;
	var cWR = canvas.width/idealWidth;
	var cHR = canvas.height/idealHeight;
	var ctx = canvas.getContext("2d");
	if (cp.img === cploff){
		cp.img = cplon;
	}
	else if(cp.img === cproff){
		cp.img = cpron;
	}
	else if(cp.img === cplon){
		cp.img = cploff;
	}
	else if(cp.img === cpron){
		cp.img = cproff;
	}
	ctx.drawImage(cp.img, cp.x*canvas.width, cp.y*canvas.height, cp.img.width*cWR, cp.img.height*cHR);
};

//Redraws the given control point. Only performed when the window is resized.
function redrawPoint(cp){
	var idealWidth = 1080;
	var idealHeight = 1250;
	var canvas = cp.canvas;
	var cWR = canvas.width/idealWidth;
	var cHR = canvas.height/idealHeight;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(cp.img, cp.x*canvas.width, cp.y*canvas.height, cp.img.width*cWR, cp.img.height*cHR);
}

//Changes the track from either green or red back to white (done after a 60 second gap)
function resetTrack(mcpData){
     mcpData.color = "white";
	 for (var i = 0; i < mcpData.segments.length; i++){
        changeTrack(mcpData.segments[i], mcpData.color);
     }
     mcpTable[key(mcpData.name)] = mcpData;
}

//Sets control points back to the default state of red
function resetPoints(mcpData){
	for (var j = 0; j < mcpData.controlPoints.length; j++){
		changePoint(mcpData.controlPoints[j]);
	}
	mcpTable[key(mcpData.name)] = mcpData;
}

// Resizes the Canvas to the full viewport.
$(document).ready(function(){
	window.addEventListener("resize", resizeCanvas, false);
	var canvas = document.getElementById('mapCanvas');
	var ctx = canvas.getContext('2d');
	var trackData = [];
	canvas.width = window.innerWidth;
	canvas.height=window.innerHeight;
	if (window.innerWidth < 950 || window.innerHeight < 1200) {
		canvas.width = 950;
		canvas.height = 1200;
	}

	ctx.fillRect(0, 0, canvas.width, canvas.height);
	var fontBase = 1080; // selected default width for canvas
	var fontSize = 24;
	ctx.font = getFont(fontSize, fontBase, canvas) + 'px Times New Roman';
	ctx.fillStyle = "white";
	ctx.fillText("Norfolk Southern", 0, .020*canvas.height);
	ctx.fillText("Harrisburg Division", 0, .040*canvas.height);
	var dlts = new drawLurganToShip();
	var dltsDraw = dlts.draw(canvas, ctx);
	var dstf = new drawShipToFront();
	var dstfDraw = dstf.draw(canvas, ctx);
})


// Resizes the canvas
// Code originally found at https://www.kirupa.com/html5/resizing_html_canvas_element.htm
function resizeCanvas(e){
	var canvas = document.getElementById('mapCanvas');
	var ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height=window.innerHeight;
	if (window.innerWidth < 950 || window.innerHeight < 1200) {
		canvas.width = 950;
		canvas.height =1200;
	}

	//Draws the canvas, labels, control points, and segments again
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	var dstf = new drawShipToFront();
	dstf.draw(canvas, ctx);
	var dlts = new drawLurganToShip();
	dlts.draw(canvas, ctx);

    //keep the colors of control points and segments the same (i.e. the ones that have been changed) when you change the size
	for (var i = 0; i < Object.keys(mcpTable).length; i++){
	    var mcpSegments = mcpTable[key(segNames[i])].segments;
		var mcpControls = mcpTable[key(segNames[i])].controlPoints;
	    var mcpColor = mcpTable[key(segNames[i])].color;
	    //Change the segments
	    for (var j = 0; j < Object.keys(mcpSegments).length; j++){
	        if (mcpColor != "white"){
	             changeTrack(mcpSegments[j], mcpColor);
	        }
	    }
	    //Change the control points
		for (var k = 0; k < Object.keys(mcpControls).length; k++){
			redrawPoint(mcpControls[k]);
		}
	}
	var fontBase = 1080; // selected default width for canvas
	var fontSize = 24;
	ctx.font = getFont(fontSize, fontBase, canvas) + 'px Times New Roman';
	ctx.fillStyle = "white";
	ctx.fillText("Norfolk Southern", 0, .020*canvas.height);
	ctx.fillText("Harrisburg Division", 0, .040*canvas.height);
}

//Array of all the names of the MCPS
var segNames = ["Ship", "Lees Cross Roads", "Carl", "Spring", "Ross", "Front", "Town", "CP-67", "CP-65", "CP-64", "CP-62", "CP-53", "CP-50"];