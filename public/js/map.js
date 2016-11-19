
//Javascript Code for drawing the map.

//Draws Lurgan to SHIP segment
var drawLurganToShip = function() {
};
// TODO - change text sizing
drawLurganToShip.prototype.drawLTSText = function(canvas, ctx){
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
		ctx.fillText("CP-53", 0.72*canvas.width, 0.57*canvas.height);
		ctx.fillText("CP-50", 0.8*canvas.width, 0.57*canvas.height);
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
		var lurgan_ramp = createTrack(.2361, .495, .286, .535, canvas);
		// NS H-Line
		var nsh_straight = createTrack(.116, .520, .196, .520, canvas);
		var nsh_ramp = createTrack(.1961, .520, .216, .535, canvas);
		// to Roanoke
		var roanoke_line = createTrack(.116, .540, .86, .540, canvas);
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
		var cp53_ramp_r = createTrack(.740, .540, .766, .520, canvas);
		var cp65_straight = createTrack(.7661, .520, .796, .520, canvas);
		var cp65_ramp_l = createTrack(.7961, .520, .820, .540, canvas);
		ctx.stroke();
		return this;
};

//Draws control points for the Lurgan to Ship region - draw the "off" graphic in the proper direction by default
drawLurganToShip.prototype.drawLTSControlPoints = function(canvas, ctx){
	var cpr = document.getElementById("cproff")
	var cpl = document.getElementById("cploff")
	//ctx.drawImage(
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

    oldCtx.drawImage(newCanvas, x1*canvas.width-lineWidth, y1*canvas.height);
    document.body.appendChild(newCanvas);


    var marker = {
        canvas: newCanvas,
        ctx: newCtx
    };
    return marker;
};


drawShipToFront.prototype.draw = function(canvas, ctx){
		this.drawSTFTrack(canvas, ctx);
		this.drawSTFText(canvas, ctx);
//		this.drawLTSControlPoints(canvas, ctx);
		return this;
};


function createTrackWithWidth(x1, y1, x2, y2, canvas, lineWidth){
    var newCanvas = document.createElement("canvas");
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
    		document.body.appendChild(newCanvas);
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
    		ctx: newCtx
    	};
    	return track;
};

// Creates a new segment of track and an accompanying canvas, and returns it.
// track - the new segment of track
function createTrack(x1, y1, x2, y2,canvas){
    createTrackWithWidth(x1,y1, x2, y2, canvas, 4);
};

// Redraws the given track element in the given color.s
function changeTrack(track, color){
	track.ctx.strokeStyle = color;
	track.ctx.moveTo(0,0);
	track.ctx.lineTo(track.canvas.width, track.canvas.height);
	track.ctx.stroke();
}

// Resizes the Canvas to the full viewport.
$(document).ready(function(){
	var canvas = document.getElementById('mapCanvas');
	var ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	console.log(canvas.width);
	console.log(canvas.height);
	//Testing
	ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
	//Test - Load image
/*
	var img = new Image();
	img.src = 'public/img/controlpointoff.png';
	ctx.drawImage(img, 50, 50);
	var img2 = new Image();
	img2.src = 'public/img/controlpointon.png';
	ctx.drawImage(img2, 75, 50);
	//Text - Text
	ctx.font = ("30px Arial");
	ctx.fillStyle = "white";
	ctx.fillText("Hello World", 10, 100);
*/
	ctx.font = ("25px Times New Roman");
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