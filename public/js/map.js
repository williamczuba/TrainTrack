
//Javascript Code for drawing the map

/*The hash map set up according to what I found here: http://stackoverflow.com/questions/368280/javascript-hashmap-equivalent
, which is pretty simple.
<<<<<<< HEAD
=======
>>>>>>> origin/master
*/

//function MCP(TrainData){
//   //break up the string into separate values in an array
//   var mnemValues = TrainData.mnemonics.split(",");
//   //get the segments that are going to be changed (which will also be in the form of a list and thus separated by a comma)
//	var mcp = mcpTable[key(TrainData)];
//	var size = 0;
//	var mcpMnem;
//	if (TrainData.type == "Control"){
//		size = mcp.control.length;
//		mcpMnem = mcp.control;
//	}
//	else{
//		size = mcp.indication.length;
//		mcpMnem = mcp.indication;
//	}
//
//   for (var i = 0; i < mnemValues.length; i++){
//	   for (var j = 0; j < size; j++){
//		   if (mnemValues[i] == mcpMnem[j]){
//				changeTrack()
//		   }
//	   }
//   }
//};
function MCP(TrainData){
    console.log("Hi");
	//Convert parameter from text to an object. This is why we couldn't access the 'name' field.
    var trainDataObj = JSON.parse(TrainData);
    console.log(trainDataObj);
    var name = trainDataObj.Name;
	name = name.trim();
    console.log("Name: " , name);
//    //Find the MCP that corresponds to the name given
    var mcpData = mcpTable[key(name)];
    console.log("MCP Data: ", mcpData);
//    var mcpData2 = mcpTable[key(TrainData.name)];
//    console.log("MCP Data2: ", mcpData2)
    var segments = "";
    if (mcpData != null){
         segments = mcpData.segments;
		 if(mcpData.timer != undefined){
			clearTimeout(mcpData.timer);
		 }
		 mcpData.time = 2000;
		 mcpData.timer = setTimeout(resetTrack(mcpData.segments), mcpData.time);
    }
    var color = "";
    console.log("Message type: ", trainDataObj.message_type);
    var msgType = trainDataObj.message_type;
    if (msgType == "Control"){
        console.log("Control")
        color = "red";
    }
    else if (msgType == "Indication"){
        console.log("Indication")
        color = "green";
    }
    for (var i = 0; i < segments.length; i++){
		console.log(segments[i]);
        changeTrack(segments[i], color);
    }
};

//Global variable hash table for storing the mnemonics that correspond to their track segments
var mcpTable = {};

/* This function creates the hash key from the mcp name. The name refers to an MCP object, which holds the MCP
segments that will need to be colored. The function takes 11, a prime number, and multiplies that by 53 before adding the ASCII
code of each letter in the name. This creates a unique key.
*/

var key = function(mcpName){
    var hash = 11;
	for (var i = 0; i < mcpName.length; i++){
        hash = hash * 53 + mcpName.charCodeAt(i);
	}

//	console.log("mcpName: ", mcpName, "Hash: " , hash);
	return hash;
};


//Functions for creating the track segments
//Draws Lurgan to SHIP segment
var drawLurganToShip = function(){
};

// TODO - change text sizing
drawLurganToShip.prototype.drawLTSText = function (canvas, ctx){
		// Draw Text
		// Orange, size 1em
		ctx.font = ("1em Arial");
		ctx.fillStyle = "#ffa500";
		ctx.fillText("Lurgan Sub", 0.04*canvas.width, 0.5*canvas.height);
		ctx.fillText("NS H-Line", 0.04*canvas.width, 0.53*canvas.height);
		ctx.fillText("to Roanoke", 0.04*canvas.width, 0.55*canvas.height);
		ctx.fillText("Lurgan Branch", .796*canvas.width, 0.48*canvas.height);
		ctx.fillText("to Ship", .796*canvas.width, 0.5*canvas.height);
		// Gray, size 1em
		ctx.fillStyle = "#d3d3d3";
		ctx.fillText("TOWN", 0.190*canvas.width, 0.57*canvas.height);
		ctx.fillText("CP-67", 0.44*canvas.width, 0.5*canvas.height);
		ctx.fillText("CP-65", 0.52*canvas.width, 0.5*canvas.height);
		ctx.fillText("CP-64", 0.576*canvas.width, 0.57*canvas.height);
		ctx.fillText("CP-62", 0.62*canvas.width, 0.57*canvas.height);
		ctx.fillText("CP-53", 0.76*canvas.width, 0.57*canvas.height);
		ctx.fillText("CP-50", 0.84*canvas.width, 0.57*canvas.height);
		// Orange, size 0.8em
		ctx.font = ("0.8em Arial");
		ctx.fillStyle = "#ffa500";
		ctx.fillText("NS Industrial Lead", 0.402*canvas.width, 0.610*canvas.height);
		ctx.fillText("CSX Lurgan Sub", 0.402*canvas.width, 0.57*canvas.height);
		ctx.fillText("CSX Hanover Sub", 0.402*canvas.width, 0.59*canvas.height);
		ctx.fillText("Greencastle Yard", 0.490*canvas.width, 0.575*canvas.height);
		return this;
};

drawLurganToShip.prototype.drawLTSTrack = function(canvas, ctx){
		// Draw Track - Nearby text on original layout listed in comments
		// Town Segments - goes up to SEA

		//Town section -- 17 lines
		// CSX
		var csx_straight = createTrack(.116, .470, .186, .470, canvas);
		var csx_ramp = createTrack(.1861, .470, .206, .485, canvas);
		// Lurgan Sub
		var lurgan_straight = createTrack(.116, .495, .226, .495, canvas);
		//TODO: Fix positioning of this line. Shouldn't be as far over as it is. Matters less since track segments are out.
		var lurgan_ramp = createTrack(.2261, .495, .286, .535, canvas);// NS Industrial Lead
		var nsi_ramp = createTrack(.266, .540, .336, .600, canvas);
		var nsi_straight = createTrack(.3361, .600, .400, .600, canvas);
		// CSX Lurgan Sub
		var csxl_ramp = createTrack(.310, .540, .336, .560, canvas);
		var csxl_straight = createTrack(.3361, .560, .400, .560, canvas);
		// CSX Hanover Sub
		var csxh_ramp = createTrack(.360, .560, .386, .580, canvas);
		var csxh_straight = createTrack(.3861, .580, .400, .580, canvas);
		var nsh_straight = createTrack(.116, .520, .196, .520, canvas);
		var nsh_ramp = createTrack(.1961, .520, .216, .535, canvas);
		// NS Industrial Lead
//		var nsi_ramp = createTrack(.266, .540, .336, .600, canvas);
//		var nsi_straight = createTrack(.3361, .600, .400, .600, canvas);
		// CSX Hanover Sub
		var csxh_ramp = createTrack(.360, .560, .386, .580, canvas);
		var csxh_straight = createTrack(.3861, .580, .400, .580, canvas);
		// From "to Roanoke" to SSA
		var roanoke_to_ssa = createTrack(.116, .540, .400, .540, canvas);
		var town_segments = [csx_straight, csx_ramp, lurgan_straight, lurgan_ramp, nsi_ramp, nsi_straight, csxl_ramp,
							 csxl_straight, csxh_ramp, csxh_straight, nsh_straight, nsh_ramp, nsi_ramp, nsi_straight,
							roanoke_to_ssa];
		var town = createMCP("Town ", town_segments);
		mcpTable[town.name] = town;

		//CP-67 -- 4 lines
		var sea_to_1t = createTrack(.400, .540, .470, .540, canvas);
		var o1 = createTrack(.470, .540, .500, .540, canvas);
		var gc_ramp_l = createTrack(.440, .540, .466, .560, canvas);
		var gc_straight_to_3sea = createTrack(.4661, .560, .500, .560, canvas);
		var cp67_segments = [sea_to_1t, o1, gc_ramp_l, gc_straight_to_3sea];
		var cp67 = createMCP("CP-67", cp67_segments);
		mcpTable[key(cp67.name)] = cp67;

        // CP-65 -- 3 lines
		var cp65_bottom_straight = createTrack(.500, .540, .560, .540, canvas);
		var cp65_top_straight1 = createTrack(.5361, .520, .583, .520, canvas);
		var cp65_ramp_1 = createTrack(.510, .540, .536, .520, canvas);
	    var cp65_segments = [cp65_bottom_straight, cp65_ramp_1, cp65_top_straight1];
        var cp65 = createMCP("CP-65", cp65_segments);
        mcpTable[key(cp65.name)] = cp65;

		// CP-64 -- 3 lines
		var gc_ramp_r = createTrack(.5601, .560, .586, .540, canvas);
		var cp64_bottom_straight = createTrack(.560, .540, .620, .540, canvas);
	    var gc_straight_remaining = createTrack(.500, .560, .560, .560, canvas); // from CP-67
		var cp64_segments = [cp64_bottom_straight, gc_ramp_r, gc_straight_remaining];
		var cp64 = createMCP("CP-64", cp64_segments);
		mcpTable[key(cp64.name)] = cp64;

        //CP-62 -- 3 lines
    	var cp62_top_straight2 = createTrack(.5831, .520,  .630, .520, canvas);
	    var cp62_ramp_r = createTrack(.6301, .520, .656, .540, canvas);
	    var cp62_bottom_straight = createTrack(.620, .540, .700, .540, canvas);
        var cp62_segments = [cp62_top_straight2, cp62_ramp_r, cp62_bottom_straight];
        var cp62 = createMCP("CP-62", cp62_segments);
        mcpTable[key(cp62.name)] = cp62;

        //CP-53 -- 3 lines
        var cp53_straight = createTrack(.700, .540, .815, .540, canvas);
		var cp53_ramp_l = createTrack(.770, .540, .796, .520, canvas);
		var cp53_top_straight = createTrack(.7961, .520, .815, .520, canvas);
		var cp53_segments = [cp53_straight, cp53_ramp_l, cp53_top_straight];
		var cp53 = createMCP("CP-53", cp53_segments);
		mcpTable[key(cp53.name)] = cp53;

        //CP - 50 -- 3 lines
		var cp50_straight_top = createTrack(.8151, .520, .826, .520, canvas);
		var cp50_ramp_r = createTrack(.8261, .520, .850, .540, canvas);
        var cp50_straight_bottom = createTrack(.700, .540, .905, .540, canvas)
        var cp50_segments = [cp50_straight_top, cp50_ramp_r, cp50_straight_bottom];
        var cp50 = createMCP("CP-50", cp50_segments);
        mcpTable[key(cp50.name)] = cp50;
		return this;
};

//Will not be needed. Redrawing track will be tied to MCPs instead.
/*
drawLurganToShip.prototype.drawLTSTrackSegments = function(canvas, ctx){
	//Lurgan Sub and NS-H Line segments
	var ra1 = createTrackSeg(.116, .46, .148, .48, "1RA", "right", canvas);
	mnemTable[key(ra1)] = ra1;
	var ra2 = createTrackSeg(.116, .485, .148, .505, "2RA", "right", canvas);
	mnemTable[key(ra2)] = ra2;
	var rra = createTrackSeg(.116, .51, .148, .53, "RRA", "right", canvas);
	mnemTable[key(rra)] = rra;
	var sra = createTrackSeg(.116, .53, .148, .55, "SRA", "right", canvas);
	mnemTable[key(sra)] = sra;
	var na1 = createTrackSeg(.148, .46, .18, .48, "1NA", "right", canvas);
	mnemTable[key(na1)] = na1;
	var na2 = createTrackSeg(.148, .485, .18, .505, "2NA", "right", canvas);
	mnemTable[key(na2)] = na2;
	var rna = createTrackSeg(.148, .51, .18, .53, "RNA", "right", canvas);
	mnemTable[key(rna)] = rna;
	var sna = createTrackSeg(.148, .53, .18, .55, "SNA", "right", canvas);
	mnemTable[key(sna)] = sna;
	//6T segments
	var t61 = createTrackSeg(.18, .46, .186, .48, "6T", "none", canvas);
	mnemTable[key(t61)] = t61;
	var t62 = createTrackSeg(.186, .46, .206, .495, "6T", "none", canvas);
	mnemTable[key(t62)] = t62;
	var t63 = createTrackSeg(.18, .485, .206, .495, "6T", "none", canvas);
	mnemTable[key(t63)] = t63;
	var nw9 = createTrackSeg(.206, .485, .214, .505, "9NW", "none", canvas);
	mnemTable[key(nw9)] = nw9;
	var t64 = createTrackSeg(.214, .485, .236, .505, "6T", "none", canvas);
	mnemTable[key(t64)] = t64;
	var t65 = createTrackSeg(.236, .485, .286, .54, "6T", "none", canvas);
	mnemTable[key(t65)] = t65;
	//1T segments
	var t11 = createTrackSeg(.18, .51, .194, .53, "1T", "none", canvas);
	mnemTable[key(t11)] = t11;
	var t12 = createTrackSeg(.194, .51, .216, .545, "1T", "none", canvas);
	mnemTable[key(t12)] = t12;
	var t13 = createTrackSeg(.18, .53, .216, .55, "1T", "none", canvas);
	mnemTable[key(t13)] = t13;
	var nw7 = createTrackSeg(.216, .53, .232, .55, "7NW", "none", canvas);
	mnemTable[key(nw7)] = nw7;
	var t14 = createTrackSeg(.232, .53, .240, .55, "1T", "none", canvas);
	mnemTable[key(t14)] = t14;
	//Roanoke/Downward Ramps connecting stretch
	var t21 = createTrackSeg(.240, .53, .248, .55, "2T", "none", canvas);
	mnemTable[key(t21)] = t21;
	var nw3 = createTrackSeg(.248, .53, .256, .55, "3NW", "none", canvas);
	mnemTable[key(nw3)] = nw3;
	var t22 = createTrackSeg(.256, .53, .304, .55, "2T", "both", canvas);
	mnemTable[key(t22)] = t22;
};
*/
//TODO: The way I was making MCP's is probably not the best way to go about this. Should probably structure them as hashmaps
//instead, with the mnemonic as the key and the value being the corresponding track segment/control point. Just modify
//the implementation so there's SOME kind of connection between mnemonics and what they represent - there isn't right now.
/*
drawLurganToShip.prototype.createLTS_MCPLists = function(){

	var town_c = ["","","2NGZ","1RWZ","4SGZ","1NWZ","SMZ","","","","6NGZ","3RWZ","2SGZ","3NWZ","","","","","","5RWZ","","5NWZ","","","","SSXOZ","SSXZ","7NWZ","","7NWZ","","","","","","9NWZ","","9NWZ","","","","","","2RWZ","","2NWZ","",""];
	var town_i = ["ATK","1RWK","2NGK","1NWK","4SGK","HSAK","2TK","SSAK","1LZK","3RWK","6NGK","3NWK","2SGK","ISAK","1TK","SLAK","5LZK","5RWK","6SGK","5NWK","SSXK","2NAK","RNAK","SNAK","P0K","7RWK","NLCK","7NWK","SMK","1RAK","","1NAK","6TK","9RWK","L0K","9NWK","SLCK","2RAK","RRAK","SRAK","2LZK","2RWK","","2NWK","","","","LSAK"];
	var town = createMCP("1", town_c, town_i, "75505550100101");
	var cp67_c = ["7NWZ","","","","","","1RWZ","1NWZ","","","","","","2STZ","2WGZ","2EGZ","","","","","","","",""];
	var cp67_i = ["3RWK","3NWK","7LZK","7NWK","7RWK","1LZK","1RWK","1NWK","SEAK","1TK","2WGK","2EGK","5LZK","5RWK","5NWK","3LZK","","SMK","1OXK","SEXK","SWAK","","1OK","SRAK","","","","","","SWXK","",""];
	var cp67 = createMCP("2", cp67_c, cp67_i, "75505550200101");
	var cp65_c = ["0OXZ","SOXOZ","SOXZ","2WGZ","2STZ","2EGZ","1RWZ","1NWZ","","","","MCZ","SMZ","2WXOZ","2WXZ","0OXOZ"];
	var cp65_i = ["2WXK","0OXK","1LZK","TK","2EGK","2WGK","1RWK","1NWK","L0K","","SMK","2LAK","1OK","2WAK","0OK","1OXK","","","","B0K","","GFDK","DAK","P0K","","","","","","","",""]
	var cp65 = createMCP("0", cp65_c, cp65_i, "75505550170101");
	var cp64_c = ["","","5RWZ","5NWZ","3RWZ","3NWZ","1RWZ","1NWZ","","","","","","","2EGZ","2WGZ","","","","","","","",""];
	var cp64_i = ["5RWK","5NWK","3LZK","3NWK","","1LZK","1RWK","1NWK","1OK","1TK","2EGK","2WGK","7LZK","7NWK","7RWK","5LZK","","","SMK","0OXK","1OXK","SEAK","","0OK","","","","","","","SEXK",""];
	var cp64 = createMCP("3", cp64_c, cp64_i, "75505550180202");
	var cp62_c = ["2EXZ","1OXOZ","1OXZ","2WGZ","2STZ","2EGZ","1RWZ","1NWZ","","","","MCZ","SMZ","SWXOZ","SWXZ","2EXOZ"];
	var cp62_i = ["2EXK","1OXK","1LZK","TK","2WGK","2EGK","1RWK","1NWK","L0K","","SMK","SLAK","SWAK","2EAK","1OK","SWXK","","","","B0K","","GFDK","DAK","P0K"];
	var cp62 = createMCP("4", cp62_c, cp62_i, "75505550160101");
	var cp53_c = ["","","2NGZ","1RWZ","2SGZ","1NWZ","SMZ","","","","SNXOZ","SNXZ","CSXOZ","CSXZ","SSXOZ","SSXZ"];
	var cp53_i = ["","1RWK","2NGK","1NWK","2SGK","SRAK","TK","SNAK","1LZK","P0K","B0K","SMK","L0K","","CSAK","SSAK","","","","","","SNXK","CSXK","SSXK"];
	var cp53 = createMCP("5", cp53_c, cp53_i, "75505550080203");
	var cp50_c = ["","","2NGZ","1RWZ","2SGZ","1NWZ","SMZ","","","","SSXOZ","SSXZ","CNXOZ","CNXZ","SNXOZ","SNXZ"];
	var cp50_i = ["","1RWK","2NGK","1NWK","2SGK","SLAK","TK","SSAK","1LZK","P0K","B0K","SMK","L0K","SSXK","CNXK","SNXK"];
	var cp50 = createMCP("6", cp50_c, cp50_i, "75505550080101");
	var mcpList = [town, cp67, cp64, cp64, cp62, cp53, cp50];
	return mcpList;
};
*/

//Creates control points for the Lurgan to Ship region. Control points contain their location, their mnemonic, and the
//track mnemonics they control.
//TODO - starting to think control points having nothing to do with the tracks... probably need some sort of MCP structure
//to hold track and CP mnemonics.
drawLurganToShip.prototype.drawLTSControlPoints = function(canvas, ctx){
	// Load images
	var cproff = new Image();
	cproff.src = "/public/img/cproff.png";
	var cploff = new Image();
	cploff.src = "/public/img/cploff.png";
	var cpron = new Image();
	cpron.src = "/public/img/cpron.png";
	var cplon = new Image();
	cplon.src = "/public/img/cplon.png";
	// TOWN control points
	var ng6rw9 = createControlPoint(.17, .474, "1:6NG/9RW", canvas, cproff);
	var ng6nw9 = createControlPoint(.17, .501, "1:6NG/9NW", canvas, cproff);
	var ng2rw7 = createControlPoint(.17, .523, "1:2NG7RW", canvas, cproff);
	var ng2nw7 = createControlPoint(.17, .546, "1:2NG/7NW", canvas, cproff);
	var sg2 = createControlPoint(.383, .524, "1:2SG", canvas, cploff);
	var sg6nw2 = createControlPoint(.383, .544, "1:6SG/2NW", canvas, cploff);
	var sg6rw2 = createControlPoint(.383, .564, "1:6SG/2RW", canvas, cploff);
	var sg4 = createControlPoint(.383, .584, "1:4SG", canvas, cploff);
	// CP-67 - CP-62 Control Points
	var eg22 = createControlPoint(.423, .545, "2:2EG", canvas, cproff);
	var wg2nw12 = createControlPoint(.470, .523, "2:2WG/1NW", canvas, cploff);
	var wg2rw12 = createControlPoint(.470, .543, "2:2WG/1RW", canvas, cploff);
	var eg20 = createControlPoint(.500, .543, "0:2EG", canvas, cproff);
	var wg2nw10 = createControlPoint(.540, .501, "0:2WG/1NW", canvas, cploff);
	var wg2rw10 = createControlPoint(.540, .523, "0:2WG/1RW", canvas, cploff);
	var eg2nw13 = createControlPoint(.550, .543, "0:2WG/1NW", canvas, cproff);
	var eg2rw13 = createControlPoint(.550, .563, "0:2WG/1NW", canvas, cproff);
	var wg23 = createControlPoint(.590, .522, "3:2WG", canvas, cploff);
	var eg2rw14 = createControlPoint(.620, .522, "4:2EG/1RW", canvas, cproff);
	var eg2nw14 = createControlPoint(.620, .543, "4:2EG/1NW", canvas, cproff);
	var wg24 = createControlPoint(.655, .522, "4:2WG", canvas, cploff);
	// CP-53 - CP-50 Control Points
	var ng25 = createControlPoint(.76, .543, "5:2NG", canvas, cproff);
	var sg2rw15 = createControlPoint(.8, .500, "5:2SG/1RW", canvas, cploff);
	var sg2nw15 = createControlPoint(.8, .524, "5:2SG/1NW", canvas, cploff);
	var ng2rw16 = createControlPoint(.820, .524, "6:2NG/1RW", canvas, cproff);
	var ng2nw16 = createControlPoint(.820, .545, "6:2NG/1NW", canvas, cproff);
	var sg26 = createControlPoint(.870, .523, "6:2SG", canvas, cploff);
};

drawLurganToShip.prototype.draw = function(canvas, ctx){
		this.drawLTSTrack(canvas, ctx);
		//this.drawLTSTrackSegments(canvas, ctx);
		this.drawLTSText(canvas, ctx);
		this.drawLTSControlPoints(canvas, ctx);
		return this;
};

var drawShipToFront = function (){
};


drawShipToFront.prototype.drawSTFText = function(canvas, ctx){
    // Draw Text
	// Orange, size 12
	ctx.font = ("1em Arial");
	ctx.fillStyle = "#ffa500";
	ctx.fillText("to CP-50", canvas.width * .112, canvas.height * .30 );
	ctx.fillText ("Lurgan", canvas.width * .112, canvas.height * .190);
	ctx.fillText("Running", canvas.width * .112, canvas.height * .205);
	ctx.fillText("Track", canvas.width * .112, canvas.height * .220);
	ctx.fillText("Gettysburg RR", canvas.width * .415, canvas.height * .289);
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
    ctx.font = ("0.8em Arial");
    ctx.fillStyle = "#ffa500";
    ctx.fillText("PPG", .585 * canvas.width, .220 * canvas.height);
        //Gray, size 10
    ctx.fillStyle = "#d3d3d3";
    ctx.fillText("Cleversburg Junction", .22 * canvas.width, .189 * canvas.height);
    ctx.fillText("Viewing Platform", .23 * canvas.width, .205 * canvas.height);
    return this;
};

//Draws the section from Ship to Front
drawShipToFront.prototype.drawSTFTrack = function(canvas, ctx){

    //Ship -- 2 lines
    var ship_straight  = createTrack(.116, .255, .192, .255, canvas);
    var ship_top = createTrack(.148, .235, .192, .235, canvas);
    var ship_segments = [ship_straight, ship_top];
    var ship = createMCP("Ship", ship_segments);
    mcpTable[key(ship.name)] = ship;

    //Lee -- 3 lines
    var lee_top = createTrack(.192, .235, .240, .235, canvas);
    var lee_ramp = createTrack(.240, .235, .260, .250, canvas);
    var lee_straight = createTrack(.192, .255, .416, .255, canvas);
    var lee_segments = [lee_top, lee_ramp, lee_straight];
    var lee = createMCP("Lees Cross Roads", lee_segments);
    mcpTable[key(lee.name)] = lee;

    //Carl -- 7 lines
    var carl_straight = createTrack(.416, .255, .592, .255, canvas);
    var carl_ramp_l = createTrack(.524, .255, .544, .270, canvas);
    var carl_bottom_loop1 = createTrack(.544, .270, .592, .270, canvas);
    var gburg_bottom = createTrack(.476, .287, .522, .287, canvas);
    var gburg_ramp = createTrack(.5221, .287, .542, .270, canvas);
    var ppg_ramp = createTrack(.553, .251, .573, .234, canvas);
    var ppg_straight = createTrack(.573, .234, .589, .234, canvas);
    var carl_segments = [carl_straight, carl_ramp_l, carl_bottom_loop1, gburg_bottom, gburg_ramp, ppg_ramp, ppg_straight];
    var carl = createMCP("Carl", carl_segments);
    mcpTable[key(carl.name)] = carl;

    //Spring section-- 4 lines
    var ppg_top = createTrackWithWidth(.589, .234, .604, .234, canvas, .5);
    var carl_bottom_loop2 = createTrack(.592, .270, .640, .270, canvas);
    var carl_ramp_r = createTrack(.640, .270, .660, .255, canvas);
    var spring_straight = createTrack(.592, .255, .752, .255, canvas);
    var spring_segments = [ppg_top, carl_bottom_loop2, carl_ramp_r, spring_straight];
    var spring = createMCP("Spring", spring_segments);
    mcpTable[key(spring.name)] = spring;

    //Ross section-- 3 lines
    var ross_straight = createTrack(.752, .255, .896, .255, canvas);
    var ross_ramp = createTrack(.816, .25, .836, .235, canvas);
    var ross_top = createTrack(.836, .235, .868, .235, canvas);
    var ross_segments = [ross_straight, ross_ramp, ross_top];
    var ross = createMCP("Ross", ross_segments);
    mcpTable[key(ross.name)] = ross;

    //Front section -- 2 lines
    var front_top = createTrack(.868, .235, .970, .235, canvas);
    var front_straight = createTrack(.896, .255, .970, .255, canvas);
    var front_segments = [front_top, front_straight];
    var front = createMCP("Front", front_segments);
    mcpTable[key(front.name)] = front;


//    var lurgan_branch_straight = createTrack(.071, .15, .930, .15, canvas);
//    //Near Cleversburg Junction viewing platform
//    var cleversburg_straight = createTrack(.1320, .125, .315, .125, canvas);
//    var cleversburg_ramp = createTrack(.315, .125, .331, .145, canvas);
//    //Draw Gettysburg section
//    var gettysburg_straight = createTrack(.502, .190, .530, .190, canvas);
//    var gettysburg_ramp_up = createTrack(.530, .190, .540, .175, canvas);
//    //Draw Carl section
//    var carl_ramp_down = createTrack(.516, .150, .532, .175, canvas);
//    var carl_straight = createTrack(.532, .175, .592, .175, canvas);
//    var carl_ramp_up = createTrack(.592, .175, .608, .150, canvas);
//    //Draw the PPG section
//    var ppg_ramp = createTrack(.548, .15, .568, .125, canvas);
//    var ppg_straight = createTrack(.568, .125, .577, .125, canvas);
//    //Draw the Ross/Front section
//    var ross_ramp = createTrack(.765, .150, .785, .125, canvas);
//    var ross_straight = createTrack(.785, .125, .930, .125, canvas);
//    //Draw the dash in the SHIP section
//    var ship_dash = createTrack(.187, .141, .197, .130, canvas);
//    //Draw the dashes in the Front section
//    var front_dash_1 = createTrack (.860, .135, .870, .143, canvas);
//    var front_dash_2 = createTrack(.890, .143, .900, .135, canvas);
//    //draw the section near PPG that is thinner than the rest
//    var ppg_thin_straight = createTrackWithWidth(.577, .125, .590, .125, canvas, .75);

};
/*
drawShipToFront.prototype.drawSTFTrackSegments = function(canvas, ctx){
	// REGEX for trackSeg: createTrackSeg\(.\d{1,5}, .\d{1,5}, .\d{1,5}, .\d{1,5}, .{1,5}, \".{4,6}, canvas
    //Section before Lurgan upper portion begins
//    var sla = createTrackSeg(.071, .14, .1014, .16, "SRA", "right", canvas);
//    var sra = createTrackSeg(.1015, .14, .133, .16, "SRA", "right", canvas);
//
//    //Section with two concurrent sections-- Lurgan and Ship
//    var rea = createTrackSeg(.134, .115, .1645, .135, "REA", "right", canvas);
//    var sea = createTrackSeg(.134, .14, .1645, .16, "SEA", "right", canvas);
//    var t1 = createTrackSeg(.1646, .14, .2255, .16, "1T", "right", canvas);
//    var t2 = createTrackSeg(.1646, .115, .2255, .135, "2T", "right", canvas);
//    var wa1 = createTrackSeg(.2255, .115, .256, .135, "1WA", "right", canvas);
//    var wa2 = createTrackSeg(.2255, .14, .256, .16, "2WA", "right", canvas);
//    var ea1 = createTrackSeg(.257, 115, .2865, .135, "1EA", "right", canvas);
//    var ea2 = createTrackSeg(.257, .14, .2865, .16, "2EA", "right", canvas);
//    //End of ramp -- 8T sections
//    var t81 = createTrackSeg(.2866, .115, .315, .135, "8T", "none", canvas);
//    var t82 = createTrackSeg(.316, .125, .331, .145, "8T", "none", canvas);
//    var t83 = createTrackSeg(.2866, .14, .330, .16, "8T", "none", canvas);
//
//    //straightaway before Gettysburg ramp
//    var wa1 = createTrackSeg(.330, .14, .3587, .16, "1WA", "right", canvas);
//    var la1 = createTrackSeg(.3588, .14, 44481, .16, "1LA", "none", canvas);
//    var ea5 = createTrackSeg(.44481, .14, .53082, .16, "5EA", "right", canvas);
//    var ea6 = createTrackSeg(.50215, .165, .53082, .185, "6EA", "right", canvas);
//    //3T section
//    var t31 = createTrackSeg(.53082, .190, .540, .175, "3T", "none", canvas);
//    var t32 = createTrackSeg(.53082, .14, .540, .16, "3T", "none", canvas);
//
//    //Gettysburg/carl/Ppg ramp section
//    var t5 = createTrackSeg(.540, .165, .566, .185, "5T", "none", canvas);
//    var ea2 = createTrackSeg(.567, .165, .592, .185, "2EA", "right", canvas);
//    var t11 = createTrackSeg(.592, .165, .608, .150, "T", "none", canvas);
//    var t21 = createTrackSeg(.592, .14, .608, .16, "T", "none", canvas);
//    var t71 = createTrackSeg(.540, .14, .566, .16, "7T", "none", canvas);
//    var t72 = createTrackSeg(.540, .14, .566, .115, "7T", "none", canvas);
//    var ea1 = createTrackSeg(.567, .14, .185, .592, "1EA", "right", canvas);
//
//    //Ross section
//    var swa = createTrackSeg(.608, .14, .6342, .16, "SWA", "right", canvas);
//    var sla = createTrackSeg(.6342, .14, .6865, .16, "SLA", "none", canvas);
//    var sra = createTrackSeg(.6865, .14, .7388, .16, "SRA", "none", canvas);
//    var sea = createTrackSeg(.7388, .14, .765, .16, "SEA", "none", canvas);
//    var t3 = createTrackSeg(.765, .14, .7925, .16, "T", "none", canvas);
//    var t4 = createTrackSeg(.765, .14, .7925, .115, "T", "none", canvas);
//    var wa2 = createTrackSeg(.7926, .14, .82, .16, "2WA", "right", canvas);
//    var la2 = createTrackSeg(.821, .14, .8475, .16, "2LA", "right", canvas);
//    var ea2 = createTrackSeg(.8476, .14, .875, .16, "2EA", "right", canvas);
//    var t22 = createTrackSeg(.875, .14, .930, .16, "2T", "right", canvas);
//    var wa12 = createTrackSeg(.7925, .14, .8231, .16, "1WA", "right", canvas);
//    var ea12 = createTrackSeg(.8231, .14, .86115, .16, "1EA", "right", canvas);
//    var t13 = createTrackSeg(.86116, .14, .930, .16, "1T", "right", canvas);
};
*/

/*
drawShipToFront.prototype.createSTF_MCPLists = function(){
    var ship_c = ["2WGZ","2STZ","2EGZ","4WGZ","4STZ","4EGZ","3RWZ","3NWZ","","","1WXOZ","1WXZ","2WXOZ","2WXZ","SEXOZ","SEXZ"];
    var ship_i = ["","","2WGK","2EGK","4WGK","4EGK","3RWK","3NWK","SRAK","SEAK","1WXK","2WXK","SEXK","3LZK","2TK","1TK","","","","SMK","","1WAK","REAK","2WAK","","","","","","","",""];
    var ship = createMCP("7", ship_c, ship_i, "75505550020203");
    var lee_c = ["2STZ","2EXOZ","2EXZ","2EGZ","2WGZ","1RWZ","1NWZ","SMZ","","","","","1WXOZ","1WXZ","1EXOZ","1EXZ"];
    var lee_i = ["1EXK","2EXK","1LZK","TK","2EGK","2WGK","1RWK","1NWK","","","SMK","1EAK","2EAK","1LAK","1WAK","1WXK","","","","","","","",""];
    var lee = createMCP("8", lee_c, lee_i, "75505550050101");
    var carl_c = ["7RWZ","7NWZ","5RWZ","5NWZ","3RWZ","3NWZ","1RWZ","1NWZ","","","","","4WGZ","4EGZ","2WGZ","2EGZ"];
    var carl_i = ["7RWK","7NWK","5RWK","5NWK","3RWK","3NWK","1RWK","1NWK","7LZK","5LZK","3LZK","1LZK","4WGK","4EGK","2WGK","2EGK","","GEAK","SEAK","IWAK","1OK","2OK","2TK","1TK","","","","","","","","pfk"];
    var carl = createMCP("9", carl_c, carl_i, "75505550420101");
    var spring_c = ["SMZ","SMOZ","","2WGZ","2STZ","2EGZ","1RWZ","1NWZ"];
    var spring_i = ["2EAK","1EAK","TK","2WGK","1LZK","2EGK","1RWK","1NWK","SMK","SMFK","DAK","L0K","P0K","","SLAK","SWAK"];
    var spring = createMCP("a", spring_c, spring_i, "75505550410101");
    var ross_c = ["SMZ","SMOZ","","2WGZ","2STZ","2EGZ","1RWZ","1NWZ"];
    var ross_i = ["2LAK","2WAK","TK","2WGK","1LZK","2EGK","1RWK","1NWK","SMK","SMFK","DAK","L0K","P0K","1WAK","SRAK","SEAK"];
    var ross = createMCP("b", ross_c, ross_i, "75505550400101");
    var front_c = ["","2WGZ","2EGZ","3RWZ","3NWZ","1RWZ","1NWZ","SMZ","2EXOZ","2EXZ","1OXOZ","1OXZ","1EXOZ","1EXZ","4WGZ","4EGZ","","","","SMZ","","","2OXOZ","2OXZ"];
    var front_i = ["4EGK","4WGK","2EGK","2WGK","3RWK","3NWK","1RWK","1NWK","2TK","1TK","2OXK","2EXK","1OXK","1EXK","3LZK","1LZK","","","FW2K","FW1K","2OK","2EAK","1OK","1EAK","L0K","SMK","LCK","P0K","","","",""];
    var front = createMCP("c", front_c, front_i, "75505550140203");
	var mcpList = [ship, lee, carl, spring, ross, front];
	return mcpList;
};
*/

drawShipToFront.prototype.drawSTFControlPoints = function (canvas, ctx){
    var cproff = new Image();
    cproff.src = "/public/img/cproff.png";
    var cploff = new Image();
    cploff.src = "/public/img/cploff.png";
    var cpron = new Image();
    cpron.src = "/public/img/cpron.png";
    var cplon = new Image();
    cplon.src = "/public/img/cplon.png";
    //Ship to Lee's Cross Roads
    var eg27 = createControlPoint(.155, .238, "7:2EG", canvas, cproff);
    var eg47 = createControlPoint(.155, .257, "7:4EG", canvas, cproff);
    var wg27 = createControlPoint(.180, .238, "7:2WG", canvas, cploff);
    var wg47 = createControlPoint(.180, .217, "7:4WG", canvas, cploff);
    var eg1rw28 = createControlPoint(.220, .238, "8:2EG/1RW", canvas, cproff);
    var eg1nw28 = createControlPoint(.220, .257, "8:2EG/1NW", canvas, cproff);
    var wg28 = createControlPoint(.265, .238, "8:2WG", canvas, cploff);
    //Carl to Spring
    var eg29 = createControlPoint(.490, .257, "9:2EG", canvas, cproff);
    var eg49 = createControlPoint(.490, .289, "9:4EG", canvas, cproff);
    var wg7rw29 = createControlPoint(.577, .217, "9:2WG/7RW", canvas, cploff);
    var wg7nw29 = createControlPoint(.577, .238, "9:2WG/7NW", canvas, cploff);
    var wg49 = createControlPoint(.577, .257, "9:4WG", canvas, cploff);
    var a2eg1nw = createControlPoint(.615, .257, "a:2EG/1NW", canvas, cproff);
    var a2eg1rw = createControlPoint(.615, .272, "a:2EG/1RW", canvas, cproff);
    var a2wg = createControlPoint(.665, .238, "a:2WG", canvas, cploff);
    //Ross to Front
    var b2eg = createControlPoint(.780, .257, "b:2EG", canvas, cproff);
    var b2wg1rw = createControlPoint(.832, .217, "b:2WG/1RW", canvas, cploff);
    var b2wg1nw = createControlPoint(.832, .238, "b:2WG/1NW", canvas, cploff);
    var c2eg = createControlPoint(.890, .237, "c:2EG", canvas, cproff);
    var c4eg = createControlPoint(.890, .257, "c:4EG", canvas, cproff);
    var c2wg = createControlPoint(.940, .217, "c:2WG", canvas, cploff);
    var c4wg = createControlPoint(.940, .237, "c:4WG", canvas, cploff);
};

drawShipToFront.prototype.draw = function(canvas, ctx){
		this.drawSTFTrack(canvas, ctx);
		// this.drawSTFTrackSegments(canvas, ctx)
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
    //	window.alert(newCanvas.width + " before " + newCanvas.height)
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
			//document.body.appendChild(newCanvas);
			parent.appendChild(canvas);
    		oldCtx.drawImage(newCanvas, x1*canvas.width-lineWidth, y1*canvas.height);
    	}
    	else if (hLine == true){
    		newCtx.moveTo(0, lineWidth);
    		newCtx.lineTo(newCanvas.width, lineWidth);
    		newCtx.stroke();
			//document.body.appendChild(newCanvas);
			parent.appendChild(canvas);
    		oldCtx.drawImage(newCanvas, x1*canvas.width, y1*canvas.height-lineWidth);
    	}
    	else if (yflip == true){
    		newCtx.moveTo(0, newCanvas.height);
    		newCtx.lineTo(newCanvas.width, 0);
    		newCtx.stroke();
			//document.body.appendChild(newCanvas);
			parent.appendChild(canvas);
    		oldCtx.drawImage(newCanvas, x1*canvas.width, y2*canvas.height);
    	}
    	else if (xflip == true){
    		newCtx.moveTo(newCanvas.width, 0);
    		newCtx.lineTo(0, newCanvas.height);
    		newCtx.stroke();
			//document.body.appendChild(newCanvas);
			parent.appendChild(canvas);
    		oldCtx.drawImage(newCanvas, x2*canvas.width, y1*canvas.height);
    	}
    	else{
    		newCtx.moveTo(0, 0);
    		newCtx.lineTo(newCanvas.width, newCanvas.height);
    		newCtx.stroke();
			//document.body.appendChild(newCanvas);
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

//function createMCP(id, control, indication, address){
//
//    var MCP = {
//        mcp_Id : id,
//        control: control,
//        indication: indication,
//        address: address
//    };
//
//    return MCP;
//
//};

function createMCP(name, segments){
    var clearTime = 2000;
	var timer = undefined;
	var MCP = {
        name: name,
        segments: segments,
		time: clearTime,
		timer: timer
    };
	console.log("MCP Name: ", MCP.name);
	console.log("MCP Segments: ", MCP.segments);
    return MCP;
};

// Creates a new segment of track and an accompanying canvas, and returns it.
// track - the new segment of track
function createTrack(x1, y1, x2, y2, canvas){
    var track = createTrackWithWidth(x1,y1, x2, y2, canvas, 4);
	return track;
};

/*
//Will rework to create track segments
function drawMileMarker(x1, y1, x2, y2, canvas){
    lineWidth = 2;
    var newCanvas = document.createElement("canvas");
    newCanvas.width = 8;
    newCanvas.height = (y2*canvas.height-y1*canvas.height);
    var newCtx = newCanvas.getContext('2d');
    var oldCtx = canvas.getContext('2d');
    newCtx.strokeStyle = "White";
    newCtx.lineWidth = lineWidth;
    newCtx.moveTo(lineWidth, 0);
    newCtx.lineTo(lineWidth, newCanvas.height);
    newCtx.stroke();
    document.body.appendChild(newCanvas);
	oldCtx.drawImage(newCanvas, x1*canvas.width-lineWidth, y1*canvas.height);

    var marker = {
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2,
        canvas: newCanvas,
        ctx: newCtx
    }
    return marker;
};
*/

//Creates a new track segment and the mile markers it is between.
//function createTrackSeg(x1, y1, x2, y2, segMnemonic, drawWhich, canvas, mcp){
//	lineWidth = 2;
//	var newCanvas = document.createElement("canvas");
//	var parent = canvas.parentNode;
//	newCanvas.width = (x2*canvas.width-x1*canvas.width);
//    newCanvas.height = (y2*canvas.height-y1*canvas.height);
//
//    var newCtx = newCanvas.getContext('2d');
//    var oldCtx = canvas.getContext('2d');
//    newCtx.strokeStyle = "White";
//    newCtx.lineWidth = lineWidth;
//
//	if (drawWhich == "both"){
//		newCtx.moveTo(lineWidth, 0);
//		newCtx.lineTo(lineWidth, newCanvas.height);
//		newCtx.moveTo(newCanvas.width-lineWidth, 0);
//		newCtx.lineTo(newCanvas.width-lineWidth, newCanvas.height);
//		newCtx.stroke();
//		//document.body.appendChild(newCanvas);
//		parent.appendChild(canvas);
//		oldCtx.drawImage(newCanvas, x1*canvas.width, y1*canvas.height);
//	}
//	else if (drawWhich == "left"){
//		newCtx.moveTo(lineWidth, 0);
//		newCtx.lineTo(lineWidth, newCanvas.height);
//		newCtx.stroke();
//		//document.body.appendChild(newCanvas);
//		parent.appendChild(canvas);
//		oldCtx.drawImage(newCanvas, x1*canvas.width, y1*canvas.height);
//	}
//	else if (drawWhich == "right"){
//		newCtx.moveTo(newCanvas.width-lineWidth, 0);
//		newCtx.lineTo(newCanvas.width-lineWidth, newCanvas.height);
//		newCtx.stroke();
//		//document.body.appendChild(newCanvas);
//		parent.appendChild(canvas);
//		oldCtx.drawImage(newCanvas, x1*canvas.width, y1*canvas.height);
//	}
//	else if (drawWhich == "none"){
//		//document.body.appendChild(newCanvas);
//		parent.appendChild(canvas);
//		oldCtx.drawImage(newCanvas, x1*canvas.width, y1*canvas.height);
//	}
//
//	var segment = {
//        x1: x1,
//        x2: x2,
//        y1: y1,
//        y2: y2,
//		segMnemonic: segMnemonic,
//        canvas: newCanvas,
//        ctx: newCtx,
//		mcp: mcp
//    };
//	return segment;
//};

// Creates a new control point using the given coordinates, image, and mnemonics.
function createControlPoint(x, y, cMnemonic, canvas, img){
	// var newCanvas = document.createElement("canvas");
	// var newCtx = newCanvas.getContext('2d');
	var oldCtx = canvas.getContext('2d');
	$(img).load(function(){
		// newCanvas.width = img.width;
		// newCanvas.height = img.height;
		// document.body.appendChild(newCanvas);
		// oldCtx.drawImage(canvas, x*canvas.width, y*canvas.height);
		oldCtx.drawImage(img,  x*canvas.width, y*canvas.height);
		var cp = {
			// canvas: newCanvas,
			// ctx: newCtx,
			cm: cMnemonic,
			x: x,
			y: y,
			img: img
		};
		return cp;
	});
};


// Redraws the given track element in the given color.
function changeTrack(track, color){
    var x1 = track.x1;
    var x2 = track.x2;
    var y1 = track.y1;
    var y2 = track.y2;

	//var newCanvas = document.createElement("canvas");
	var newCanvas = track.nCanvas
    var parent = track.parent;
	console.log(parent);
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
        //	window.alert(newCanvas.width + " before " + newCanvas.height)
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
    	//document.body.appendChild(newCanvas);
		oldCtx.drawImage(newCanvas, x1*track.canvas.width-lineWidth, y1*track.canvas.height);
    	parent.appendChild(track.canvas);
    }
    else if (hLine == true){
		newCtx.clearRect(0,0, newCanvas.width, newCanvas.height);
        newCtx.moveTo(0, lineWidth);
        newCtx.lineTo(newCanvas.width, lineWidth);
        newCtx.stroke();
    	//document.body.appendChild(newCanvas);
		oldCtx.drawImage(newCanvas, x1*track.canvas.width, y1*track.canvas.height-lineWidth);
    	parent.appendChild(track.canvas);
     }
     else if (yflip == true){
		newCtx.clearRect(0,0, newCanvas.width, newCanvas.height);
        newCtx.moveTo(0, newCanvas.height);
        newCtx.lineTo(newCanvas.width, 0);
        newCtx.stroke();
        //document.body.appendChild(newCanvas);
		oldCtx.drawImage(newCanvas, x1*track.canvas.width, y2*track.canvas.height);
        parent.appendChild(track.canvas);
    }
    else if (xflip == true){
		newCtx.clearRect(0,0, newCanvas.width, newCanvas.height);
        newCtx.moveTo(newCanvas.width, 0);
        newCtx.lineTo(0, newCanvas.height);
        newCtx.stroke();
    	//document.body.appendChild(newCanvas);
    	oldCtx.drawImage(newCanvas, x2*track.canvas.width, y1*track.canvas.height);
		parent.appendChild(track.canvas);

    }
    else{
		newCtx.clearRect(0,0, newCanvas.width, newCanvas.height);
        newCtx.moveTo(0, 0);
        newCtx.lineTo(newCanvas.width, newCanvas.height);
        newCtx.stroke();
    	//document.body.appendChild(newCanvas);
		oldCtx.drawImage(newCanvas, x1*track.canvas.width, y1*track.canvas.height);
    	parent.appendChild(track.canvas);
     }

};

// Creates a tooltip displaying an object's mnemonic when it is clicked or tapped.
// Code modified from solution given at http://stackoverflow.com/questions/29489468/popup-tooltip-for-rectangular-region-drawn-in-canvas
function toolTip(canvas, x, y, width, height, text, timeout){

	var tt = this,
		div = document.createElement("div"),
		parent = canvas.parentNode,
		visible = false;

	var twidth = parent*.01;

	div.style.cssText =  "position:fixed;padding:7px;background:gold;pointer-events:none;width:" + twidth + "px";
	div.innerHTML = text;

	//show tooltip
	this.show = function(pos) {
		if (!visible) {
			visible = true;
			setDivPos(pos)
			parent.appendChild(div);
			setTimeout(hide, timeout);
		}
	}

	 // hide the tool-tip
	 function hide() {
	 	visible = false;                            // hide it after timeout
		parent.removeChild(div);                    // remove from DOM
	 }

	// Check mouse position
	function check(e){
		var pos = getPos(e),
			posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y - not sure about this, honestly. May need to use something else?
		if (!visible &&
        	pos.x >= x && pos.x < x + width &&
        	pos.y >= y && pos.y < y + height) {
      	tt.show(posAbs);	// Show tooltip at pos
		}
		else setDivPos(posAbs);  // else, update position
	}

	// Get mouse position relative to canvas
	function getPos(e) {
		var r = canvas.getBoundingClientRect();
		return {x: e.clientX - r.left, y: e.clientY - r.top}
	}

  // Update and adjust div position if needed (anchor to a different corner etc.) - will need to change measurements at end from px
  function setDivPos(pos) {
    if (visible){
      if (pos.x < 0) pos.x = 0;
      if (pos.y < 0) pos.y = 0;
      // other bound checks here
      div.style.left = pos.x + "px";
      div.style.top = pos.y + "px";
    }
  }

  canvas.addEventListener("mousemove", check);
  canvas.addEventListener("click", check);
}

function resetTrack(segments){
	 for (var i = 0; i < segments.length; i++){
		console.log(segments[i]);
        changeTrack(segments[i], "white");
    }
}

// Resizes the Canvas to the full viewport.
$(document).ready(function(){
    console.log("Ready");
	window.addEventListener("resize", resizeCanvas, false);
	var canvas = document.getElementById('mapCanvas');
	var ctx = canvas.getContext('2d');
	var trackData = [];
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	//console.log(canvas.width);
	//console.log(canvas.height);
	ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
	ctx.font = ("2em Times New Roman");
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
	canvas.height = window.innerHeight;
	ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
	var dstf = new drawShipToFront();
	dstf.draw(canvas, ctx);
	var dlts = new drawLurganToShip();
	dlts.draw(canvas, ctx);
	ctx.font = ("2em Times New Roman");
	ctx.fillStyle = "white";
	ctx.fillText("Norfolk Southern", 0, .020*canvas.height);
	ctx.fillText("Harrisburg Division", 0, .040*canvas.height);
}