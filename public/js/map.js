
//Javascript Code for drawing the map.

//see if hash map has been created
var created = false;
var mnemTable {};

var createHashKey = function(obj){

    if (mnemTable.includes(obj)){

    }
};

mnemTable[key(obj1)] = obj1;
mnemTable[key(obj2)] = obj2;

//Hash map containing the
function createHashMap(){
    if (!created){

        //create all the segments and add them to the table


        created = true;
    }
};



//Functions for creating the track segments
//Draws Lurgan to SHIP segment
var drawLurganToShip = function(){
};
// TODO - change text sizing
drawLurganToShip.prototype.drawLTSText = function (canvas, ctx){
		// Draw Text
		// Orange, size 12
		ctx.font = ("1em Arial");
		ctx.fillStyle = "#ffa500";
		// TODO: Don't hardcode size values as px (ie 40, 380). Always use either em (for font), or %
		//			Otherwise it'll be very difficult to resize to the screen.  If you use %, it will auto resize to fit on any screen.
		ctx.fillText("CSX", 0.04*canvas.width, 0.48*canvas.height);
		ctx.fillText("Lurgan Sub", 0.04*canvas.width, 0.5*canvas.height);
		ctx.fillText("NS H-Line", 0.04*canvas.width, 0.53*canvas.height);
		ctx.fillText("to Roanoke", 0.04*canvas.width, 0.55*canvas.height);
		ctx.fillText("Lurgan Branch", .796*canvas.width, 0.48*canvas.height);
		ctx.fillText("to Ship", .796*canvas.width, 0.5*canvas.height);
		// Gray, size 12
		ctx.fillStyle = "#d3d3d3";
		ctx.fillText("TOWN", 0.190*canvas.width, 0.57*canvas.height);
		ctx.fillText("CP-67", 0.44*canvas.width, 0.5*canvas.height);
		ctx.fillText("CP-65", 0.52*canvas.width, 0.5*canvas.height);
		ctx.fillText("CP-64", 0.576*canvas.width, 0.57*canvas.height);
		ctx.fillText("CP-62", 0.62*canvas.width, 0.57*canvas.height);
		ctx.fillText("CP-53", 0.76*canvas.width, 0.57*canvas.height);
		ctx.fillText("CP-50", 0.84*canvas.width, 0.57*canvas.height);
		// Orange, size 10
		ctx.font = ("0.8em Arial");
		ctx.fillStyle = "#ffa500";
		ctx.fillText("NS Industrial Lead", 0.402*canvas.width, 0.610*canvas.height);
		ctx.fillText("CSX Lurgan Sub", 0.402*canvas.width, 0.57*canvas.height);
		ctx.fillText("CSX Hanover Sub", 0.402*canvas.width, 0.59*canvas.height);
		ctx.fillText("Greencastle Yard", 0.490*canvas.width, 0.575*canvas.height);
		return this;
};

drawLurganToShip.prototype.drawLTSTrack = function(canvas, ctx){
		//concept for storage of track segments - needed for recoloring?
		//var tinfo = ["mnemonic", x, y, x2, y2]
		// Draw Track - Nearby text on original layout listed in comments
		ctx.lineWidth = 4;
		ctx.strokeStyle = "white";
		// CSX
		var csx_straight = createTrack(.116, .470, .186, .470, canvas);
		var csx_ramp = createTrack(.1861, .470, .206, .485, canvas);
		// Lurgan Sub
		var lurgan_straight = createTrack(.116, .495, .236, .495, canvas);
		//TODO: Fix positioning of this line. Shouldn't be as far over as it is.
		var lurgan_ramp = createTrack(.2361, .495, .286, .535, canvas);
		// NS H-Line
		var nsh_straight = createTrack(.116, .520, .196, .520, canvas);
		var nsh_ramp = createTrack(.1961, .520, .216, .535, canvas);
		// to Roanoke
		var roanoke_line = createTrack(.116, .540, .94, .540, canvas);
		// NS Industrial Lead
		var nsi_ramp = createTrack(.266, .540, .336, .600, canvas);
		var nsi_straight = createTrack(.3361, .600, .400, .600, canvas);
		// CSX Lurgan Sub
		var csxl_ramp = createTrack(.310, .540, .336, .560, canvas);
		var csxl_straight = createTrack(.3361, .560, .400, .560, canvas);
		// CSX Hanover Sub
		var csxh_ramp = createTrack(.360, .560, .386, .580, canvas);
		var csxh_straight = createTrack(.3861, .580, .400, .580, canvas);
		// Greencastle Yard
		var gc_ramp_l = createTrack(.440, .540, .466, .560, canvas);
		var gc_straight = createTrack(.4661, .560, .560, .560, canvas);
     	var gc_ramp_r = createTrack(.5601, .560, .586, .540, canvas);
		// CP-65 to CP-62
		var cp65_ramp_r = createTrack(.510, .540, .536, .520, canvas);
		var cp65_straight = createTrack(.5361, .520, .630, .520, canvas);
		var cp65_ramp_l = createTrack(.6301, .520, .656, .540, canvas);
		// Near CP-53 and CP-50
		var cp53_ramp_r = createTrack(.770, .540, .796, .520, canvas);
		var cp65_straight = createTrack(.7961, .520, .826, .520, canvas);
		var cp65_ramp_l = createTrack(.8261, .520, .850, .540, canvas);

		return this;
};

drawLurganToShip.prototype.drawLTSTrackSegments = function(canvas, ctx){
	//Lurgan Sub and NS-H Line segments
	var ra1 = createTrackSeg(.116, .46, .148, .48, "1RA", "right", canvas);
	var ra2 = createTrackSeg(.116, .485, .148, .505, "2RA", "right", canvas);
	var rra = createTrackSeg(.116, .51, .148, .53, "RRA", "right", canvas);
	var sra = createTrackSeg(.116, .53, .148, .55, "SRA", "right", canvas);
	var na1 = createTrackSeg(.148, .46, .18, .48, "1NA", "right", canvas);
	var na2 = createTrackSeg(.148, .485, .18, .505, "2NA", "right", canvas);
	var rna = createTrackSeg(.148, .51, .18, .53, "RNA", "right", canvas);
	var sna = createTrackSeg(.148, .53, .18, .55, "SNA", "right", canvas);
	//6T segments
	var t61 = createTrackSeg(.18, .46, .186, .48, "6T", "none", canvas);
	var t62 = createTrackSeg(.186, .46, .206, .495, "6T", "none", canvas);
	var t63 = createTrackSeg(.18, .485, .206, .495, "6T", "none", canvas);
	var nw9 = createTrackSeg(.206, .485, .214, .505, "9NW", "none", canvas);
	var t64 = createTrackSeg(.214, .485, .236, .505, "6T", "none", canvas);
	var t65 = createTrackSeg(.236, .485, .286, .54, "6T", "none", canvas);
	//1T segments
	var t11 = createTrackSeg(.18, .51, .194, .53, "1T", "none", canvas);
	var t12 = createTrackSeg(.194, .51, .216, .545, "1T", "none", canvas);
	var t13 = createTrackSeg(.18, .53, .216, .55, "1T", "none", canvas);
	var nw7 = createTrackSeg(.216, .53, .232, .55, "7NW", "none", canvas);
	var t14 = createTrackSeg(.232, .53, .240, .55, "1T", "none", canvas);
	//Roanoke/Downward Ramps connecting stretch
	var t21 = createTrackSeg(.240, .53, .248, .55, "2T", "none", canvas);
	var nw3 = createTrackSeg(.248, .53, .256, .55, "3NW", "none", canvas);
	var t22 = createTrackSeg(.256, .53, .304, .55, "2T", "both", canvas);
};
//TODO: The way I was making MCP's is probably not the best way to go about this. Should probably structure them as hashmaps
//instead, with the mnemonic as the key and the value being the corresponding track segment/control point. Just modify
//the implementation so there's SOME kind of connection between mnemonics and what they represent - there isn't right now.
drawLurganToShip.prototype.createLTS_MCPLists = function(){

	var town_c = ["","","2NGZ","1RWZ","4SGZ","1NWZ","SMZ","","","","6NGZ","3RWZ","2SGZ","3NWZ","","","","","","5RWZ","","5NWZ","","","","SSXOZ","SSXZ","7NWZ","","7NWZ","","","","","","9NWZ","","9NWZ","","","","","","2RWZ","","2NWZ","",""];
	var town_i = ["ATK","1RWK","2NGK","1NWK","4SGK","HSAK","2TK","SSAK","1LZK","3RWK","6NGK","3NWK","2SGK","ISAK","1TK","SLAK","5LZK","5RWK","6SGK","5NWK","SSXK","2NAK","RNAK","SNAK","P0K","7RWK","NLCK","7NWK","SMK","1RAK","","1NAK","6TK","9RWK","L0K","9NWK","SLCK","2RAK","RRAK","SRAK","2LZK","2RWK","","2NWK","","","","LSAK"];
	var town = createMCP("1", town_c, town_i, "75505550100101");
	var cp67_c = ["7NWZ","","","","","","1RWZ","1NWZ","","","","","","2STZ","2WGZ","2EGZ","","","","","","","",""];
	var cp67_i = ["3RWK","3NWK","7LZK","7NWK","7RWK","1LZK","1RWK","1NWK","SEAK","1TK","2WGK","2EGK","5LZK","5RWK","5NWK","3LZK","","SMK","1OXK","SEXK","SWAK","","1OK","SRAK","","","","","","SWXK","",""];
	var cp67 = createMCP("2", cp67_c, cp67_i, "75505550200101");
	var cp65_c = ["0OXZ","SOXOZ","SOXZ","2WGZ","2STZ","2EGZ","1RWZ","1NWZ","","","","MCZ","SMZ","2WXOZ","2WXZ","0OXOZ"];
	var cp65_i = ["2WXK","0OXK","1LZK","TK","2EGK","2WGK","1RWK","1NWK","L0K","","SMK","2LAK","1OK","2WAK","0OK","1OXK","","","","B0K","","GFDK","DAK","P0K","","","","","","","",""}
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

};

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
	console.log("In TOWN");
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

	return this;
};

drawLurganToShip.prototype.draw = function(canvas, ctx){
		this.drawLTSTrack(canvas, ctx);
		this.drawLTSTrackSegments(canvas, ctx);
		this.drawLTSText(canvas, ctx);
		this.drawLTSControlPoints(canvas, ctx);
		return this;
};

var drawShipToFront = function (){
};


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
    var spring_c = ["SMZ","SMOZ","","2WGZ","2STZ","2EGZ","1RWZ","1NWZ"};
    var spring_i = ["2EAK","1EAK","TK","2WGK","1LZK","2EGK","1RWK","1NWK","SMK","SMFK","DAK","L0K","P0K","","SLAK","SWAK"];
    var spring = createMCP("a", spring_c, spring_i, "75505550410101");
    var ross_c = ["SMZ","SMOZ","","2WGZ","2STZ","2EGZ","1RWZ","1NWZ"};
    var ross_i = ["2LAK","2WAK","TK","2WGK","1LZK","2EGK","1RWK","1NWK","SMK","SMFK","DAK","L0K","P0K","1WAK","SRAK","SEAK"];
    var ross = createMCP("b", ross_c, ross_i, "75505550400101");
    var front_c = ["","2WGZ","2EGZ","3RWZ","3NWZ","1RWZ","1NWZ","SMZ","2EXOZ","2EXZ","1OXOZ","1OXZ","1EXOZ","1EXZ","4WGZ","4EGZ","","","","SMZ","","","2OXOZ","2OXZ"];
    var front_i = ["4EGK","4WGK","2EGK","2WGK","3RWK","3NWK","1RWK","1NWK","2TK","1TK","2OXK","2EXK","1OXK","1EXK","3LZK","1LZK","","","FW2K","FW1K","2OK","2EAK","1OK","1EAK","L0K","SMK","LCK","P0K","","","",""];
    var front = createMCP("c", front_c, front_i, "75505550140203");
};

drawShipToFront.prototype.drawSTFControlPoints = function (canvas, ctx){
    var cproff = new Image();
    cproff.src = "/public/img/cproff.png";
    var cploff = new Image();
    cploff.src = "/public/img/cploff.png";
    var cpron = new Image();
    cpron.src = "/public/img/cpron.png";
    var cplon = new Image();
    cplon.src = "/public/img/cplon.png";
};


drawShipToFront.prototype.drawSTFText = function(canvas, ctx){

        // Draw Text
		// Orange, size 12
		ctx.font = ("1em Arial");
		ctx.fillStyle = "#ffa500";
		ctx.fillText("to CP-50", canvas.width * .112, canvas.height * .18 );

		ctx.fillText ("Lurgan", canvas.width * .120, canvas.height * .07);
		ctx.fillText("Running", canvas.width * .120, canvas.height * .09);
		ctx.fillText("Track", canvas.width * .120, canvas.height * .11);

		ctx.fillText("Gettysburg RR", canvas.width * .445, canvas.height * .194);

        ctx.fillText("Lurgan Branch", canvas.width * .675, canvas.height * .1285);

        ctx.fillText("to", canvas.width * .900, canvas.height * .10);
        ctx.fillText("Paxton", canvas.width * .900, canvas.height * .12);

        ctx.fillText("to", canvas.width * .899, canvas.height * .17);
        ctx.fillText("Capitol", canvas.width * .899, canvas.height * .19);

		// Gray, size 12
        ctx.fillStyle = "#d3d3d3";
        ctx.fillText("SHIP", .155 * canvas.width, .18 * canvas.height);
        ctx.fillText("LEES CROSS ROADS", canvas.width * .245, .18 * canvas.height);
        ctx.fillText("CARL", .550 * canvas.width, .20 * canvas.height);
        ctx.fillText("SPRING", .596 * canvas.width, .20 * canvas.height);
        ctx.fillText("ROSS", .755 * canvas.width, .18 * canvas.height);
        ctx.fillText("FRONT", .860 * canvas.width, .18 * canvas.height);

        // Orange, size 10
        ctx.font = ("0.8em Arial");
        ctx.fillStyle = "#ffa500";
        ctx.fillText("PPG", .585 * canvas.width, .120 * canvas.height);

        //Gray, size 10
        ctx.fillStyle = "#d3d3d3";
        ctx.fillText("Cleversburg Junction", .22 * canvas.width, .09 * canvas.height);
        ctx.fillText("Viewing Platform", .23 * canvas.width, .105 * canvas.height);

        return this;
};

//Draws the section from Ship to Front
drawShipToFront.prototype.drawSTFTrack = function(canvas, ctx){
    var lurgan_branch_straight = createTrack(.100, .15, .930, .15, canvas);

    //Near Cleversburg Junction viewing platform
    var cleversburg_straight = createTrack(.1320, .12, .220, .12, canvas);
    var cleversburg_ramp = createTrack(.220, .12, .235, .15, canvas);
    //Draw Gettysburg section
    var gettysburg_straight = createTrack(.502, .190, .530, .190, canvas);
    var gettysburg_ramp_up = createTrack(.530, .190, .540, .175, canvas);

    //Draw Carl section
    var carl_ramp_down = createTrack(.520, .150, .532, .175, canvas);
    var carl_straight = createTrack(.532, .175, .585, .175, canvas);
    var carl_ramp_up = createTrack(.585, .175, .597, .150, canvas);


    //Draw the PPG section
    var ppg_ramp = createTrack(.548, .150, .563, .1285, canvas);
    var ppg_straight = createTrack(.563, .1285, .573, .1285, canvas);

    //Draw the Ross/Front section
    var ross_ramp = createTrack(.765, .150, .785, .1285, canvas);
    var ross_straight = createTrack(.785, .1285, .930, .1285, canvas);
    //Draw the dash in the SHIP section
    var ship_dash = createTrack(.187, .141, .197, .130, canvas);
    //Draw the dashes in the Front section
    var front_dash_1 = createTrack (.860, .135, .870, .143, canvas);
    var front_dash_2 = createTrack(.890, .143, .900, .135, canvas);


    //draw the section near PPG that is thinner than the rest
    var ppg_thin_straight = createTrackWithWidth(.573, .1285, .590, .1285, canvas, .75);

    //draw mile markers. intervals of 16 pixels
    var marker_45 = drawMileMarker(.116, .14, .116, .16, canvas);
    var marker_42 = drawMileMarker(.132, .14, .132, .16, canvas);
    var marker_39 = drawMileMarker(.148, .14, .148, .16, canvas);
    var marker_39_upper = drawMileMarker(.148, .11, .148, .13, canvas);
    var marker_36 = drawMileMarker(.180, .14, .180, .16, canvas);
    var marker_36_upper = drawMileMarker(.180, .11, .180, .13, canvas);
    var marker_381 = drawMileMarker(.196, .14, .196, .16, canvas);
    var marker_382 = drawMileMarker(.196, .11, .196, .13, canvas);
    var marker_last_on_ramp = drawMileMarker(.212, .14, .212, .16, canvas);
    var marker_last_on_ramp_up = drawMileMarker(.212, .11, .212, .13, canvas);
    var marker_after_ramp = drawMileMarker(.244, .14, .236, .16, canvas);
    var marker_36 = drawMileMarker(.260, .14, .254, .16, canvas);
    var marker_33 = drawMileMarker(.276, .14, .276, .16, canvas);
    var marker_30 = drawMileMarker(.292, .14, .276, .16, canvas);
    var marker_30 = drawMileMarker(.292, .14, .276, .16, canvas);
    var marker_27 = drawMileMarker(.308, .14, .308, .16, canvas);
    var marker_26 = drawMileMarker(.324, .14, .308, .16, canvas);
    var marker_25 = drawMileMarker(.340, .14, .340, .16, canvas);

    //extra based on the ratios
    var ext_marker1 = drawMileMarker(.356, .14, .356, .16, canvas);
    var ext_marker2 = drawMileMarker(.372, .14, .372, .16, canvas);
    var ext_marker3 = drawMileMarker(.388, .14, .388, .16, canvas);
    var ext_marker4 = drawMileMarker(.404, .14, .404, .16, canvas);
    var ext_marker5 = drawMileMarker(.420, .14, .420, .16, canvas);
    var ext_marker6 = drawMileMarker(.436, .14, .436, .16, canvas);
    var ext_marker7 = drawMileMarker(.452, .14, .452, .16, canvas);
    var ext_marker8 = drawMileMarker(.468, .14, .468, .16, canvas);
    var ext_marker9 = drawMileMarker(.484, .14, .484, .16, canvas);
    var ext_marker10 = drawMileMarker(.500, .14, .500, .16, canvas);
    var ext_marker11 = drawMileMarker(.516, .14, .516, .16, canvas);
    var ext_marker11_lower = drawMileMarker(.516, .18, .516, .20, canvas);
};
//drawShipToFront.prototype.drawSTFControlPoints = function(canvas, ctx){
//	var cpr = document.getElementByID("cproff")
//	var cpl = document.getElementByID("cploff")
//	ctx.drawImage(
//	return this;
//};

drawShipToFront.prototype.draw = function(canvas, ctx){
		this.drawSTFTrack(canvas, ctx);
		this.drawSTFText(canvas, ctx);
//		this.drawLTSControlPoints(canvas, ctx);
		return this;
};

//Functions for drawing and creating track elements
function createTrackWithWidth(x1, y1, x2, y2, canvas, lineWidth){
    var newCanvas = document.createElement("canvas");
//    	var lineWidth = 4;
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
			document.body.appendChild(newCanvas);
    		oldCtx.drawImage(newCanvas, x1*canvas.width-lineWidth, y1*canvas.height);
    	}
    	else if (hLine == true){
    		newCtx.moveTo(0, lineWidth);
    		newCtx.lineTo(newCanvas.width, lineWidth);
    		newCtx.stroke();
    		oldCtx.drawImage(newCanvas, x1*canvas.width, y1*canvas.height-lineWidth);
    	}
    	else if (yflip == true){
    		newCtx.moveTo(0, newCanvas.height);
    		newCtx.lineTo(newCanvas.width, 0);
    		newCtx.stroke();
			document.body.appendChild(newCanvas);
    		oldCtx.drawImage(newCanvas, x1*canvas.width, y2*canvas.height);
    	}
    	else if (xflip == true){
    		newCtx.moveTo(newCanvas.width, 0);
    		newCtx.lineTo(0, newCanvas.height);
    		newCtx.stroke();
			document.body.appendChild(newCanvas);
    		oldCtx.drawImage(newCanvas, x2*canvas.width, y1*canvas.height);
    	}
    	else{
    		newCtx.moveTo(0, 0);
    		newCtx.lineTo(newCanvas.width, newCanvas.height);
    		newCtx.stroke();
			document.body.appendChild(newCanvas);
    		oldCtx.drawImage(newCanvas, x1*canvas.width, y1*canvas.height);
    	}
    	var track = {
    		canvas: newCanvas,
    		ctx: newCtx,
			x1: x1,
			x2: x2,
			y1: y1,
			y2: y2
    	};
    	return track;
};

function createMCP(id, control, indication, address){

    var MCP = {
        mcp_Id : id,
        control: control,
        indication: indication,
        address: address
    };

    return MCP;

};

// Creates a new segment of track and an accompanying canvas, and returns it.
// track - the new segment of track
function createTrack(x1, y1, x2, y2,canvas){
    createTrackWithWidth(x1,y1, x2, y2, canvas, 4);
};

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

//Creates a new track segment and the mile markers it is between.
function createTrackSeg(x1, y1, x2, y2, segMnemonic, drawWhich, canvas){
	lineWidth = 2;
	var newCanvas = document.createElement("canvas");
	newCanvas.width = (x2*canvas.width-x1*canvas.width);
    newCanvas.height = (y2*canvas.height-y1*canvas.height);

    var newCtx = newCanvas.getContext('2d');
    var oldCtx = canvas.getContext('2d');
    newCtx.strokeStyle = "White";
    newCtx.lineWidth = lineWidth;
	
	if (drawWhich == "both"){
		newCtx.moveTo(lineWidth, 0);
		newCtx.lineTo(lineWidth, newCanvas.height);
		newCtx.moveTo(newCanvas.width-lineWidth, 0);
		newCtx.lineTo(newCanvas.width-lineWidth, newCanvas.height);
		newCtx.stroke();
		document.body.appendChild(newCanvas);
		oldCtx.drawImage(newCanvas, x1*canvas.width, y1*canvas.height);
	}
	else if (drawWhich == "left"){
		newCtx.moveTo(lineWidth, 0);
		newCtx.lineTo(lineWidth, newCanvas.height);
		newCtx.stroke();
		document.body.appendChild(newCanvas);
		oldCtx.drawImage(newCanvas, x1*canvas.width, y1*canvas.height);
	}
	else if (drawWhich == "right"){
		newCtx.moveTo(newCanvas.width-lineWidth, 0);
		newCtx.lineTo(newCanvas.width-lineWidth, newCanvas.height);
		newCtx.stroke();
		document.body.appendChild(newCanvas);
		oldCtx.drawImage(newCanvas, x1*canvas.width, y1*canvas.height);
	}
	else if (drawWhich == "none"){
		document.body.appendChild(newCanvas);
		oldCtx.drawImage(newCanvas, x1*canvas.width, y1*canvas.height);
	}
	
	var segment = {
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2,
		segMnemonic: segMnemonic,
        canvas: newCanvas,
        ctx: newCtx
    };
	return segment;
};

// Creates a new control point using the given coordinates, image, and mnemonics.
function createControlPoint(x, y, cMnemonic, canvas, img){
	var newCanvas = document.createElement("canvas");
	var newCtx = newCanvas.getContext('2d');
	var oldCtx = canvas.getContext('2d');
	$(img).load(function(){
		newCanvas.width = img.width;
		newCanvas.height = img.height;
		document.body.appendChild(newCanvas);
		oldCtx.drawImage(newCanvas, x*canvas.width, y*canvas.height);
		newCtx.drawImage(img, 0, 0);
		var cp = {
			canvas: newCanvas,
			ctx: newCtx,
			cm: cMnemonic,
			x: x,
			y: y,
			img: img
		};
		return cp;
	});
};

// Redraws the given track element in the given color.s
function changeTrack(track, color){
	track.ctx.strokeStyle = color;
	track.ctx.moveTo(0,0);
	track.ctx.lineTo(track.canvas.width, track.canvas.height);
	track.ctx.stroke();
};

// Resizes the Canvas to the full viewport.
$(document).ready(function(){
	var canvas = document.getElementById('mapCanvas');
	var ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	console.log(canvas.width);
	console.log(canvas.height);
	ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
	ctx.font = ("2em Times New Roman");
	ctx.fillStyle = "white";
	ctx.fillText("Norfolk Southern", 0, 20);
	ctx.fillText("Harrisburg Division", 0, 40);
	var dlts = new drawLurganToShip();
	//var dbtw = new drawBurkeToWyomissing();
	//var dctb = new drawCannonToBeaver();
	dlts.draw(canvas, ctx);

	var dstf = new drawShipToFront();
	dstf.draw(canvas, ctx);

	//dbtw.draw(canvas, ctx);
	//dctb.draw(canvas, ctx);
})