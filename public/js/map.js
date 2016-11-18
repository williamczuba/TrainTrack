//Javascript Code for drawing the map.

//Draws Lurgan to SHIP segment
var drawLurganToShip = function() {
};
	
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
		var csx_ramp = createTrack(.187, .470, .206, .485, canvas);
		// Lurgan Sub
		ctx.moveTo(.116*canvas.width, .495*canvas.height);
		ctx.lineTo(.236*canvas.width, .495*canvas.height);
		ctx.lineTo(.286*canvas.width, .535*canvas.height);
		// NS H-Line
		ctx.moveTo(.116*canvas.width, .520*canvas.height);
		ctx.lineTo(.196*canvas.width, .520*canvas.height);
		ctx.lineTo(.216*canvas.width, .535*canvas.height);
		// to Roanoke
		ctx.moveTo(.116*canvas.width, .540*canvas.height);
		ctx.lineTo(.86*canvas.width, .540*canvas.height);
		// NS Industrial Lead
		ctx.moveTo(.266*canvas.width, .540*canvas.height);
		ctx.lineTo(.336*canvas.width, .600*canvas.height);
		ctx.lineTo(.400*canvas.width, .600*canvas.height);
		// CSX Lurgan Sub
		ctx.moveTo(.310*canvas.width, .540*canvas.height);
		ctx.lineTo(.336*canvas.width, .560*canvas.height);
		ctx.lineTo(.400*canvas.width, .560*canvas.height);
		// CSX Hanover Sub
		ctx.moveTo(.360*canvas.width, .560*canvas.height);
		ctx.lineTo(.386*canvas.width, .580*canvas.height);
		ctx.lineTo(.400*canvas.width, .580*canvas.height);
		// Greencastle Yard
		ctx.moveTo(.440*canvas.width, .540*canvas.height);
		ctx.lineTo(.466*canvas.width, .560*canvas.height);
		ctx.lineTo(.560*canvas.width, .560*canvas.height);
		ctx.lineTo(.586*canvas.width, .540*canvas.height);
		// CP-65 to CP-62
		ctx.moveTo(.510*canvas.width, .540*canvas.height);
		ctx.lineTo(.536*canvas.width, .520*canvas.height);
		ctx.lineTo(.630*canvas.width, .520*canvas.height);
		ctx.lineTo(.656*canvas.width, .540*canvas.height);
		// Near CP-53 and CP-50
		ctx.moveTo(.740*canvas.width, .540*canvas.height);
		ctx.lineTo(.766*canvas.width, .520*canvas.height);
		ctx.lineTo(.796*canvas.width, .520*canvas.height);
		ctx.lineTo(.820*canvas.width, .540*canvas.height);
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

    ctx.moveTo(.116 * canvas.width, .15 * canvas.height); //draws the long, straight line that goes all the way across
    ctx.lineTo(.930 * canvas.width, .15 * canvas.height);

    //Near Cleversburg Junction viewing platform
    ctx.moveTo(.1320 * canvas.width, .12 * canvas.height); //draw the section above the straight line (another straight line)
    ctx.lineTo(.278 * canvas.width, .12 * canvas.height);
    ctx.moveTo(.278 * canvas.width, .12 * canvas.height); //draw the sloping downward section from that line
    ctx.lineTo(.308 * canvas.width, .15 * canvas.height);

    //Draw Gettysburg section
    ctx.moveTo(.505 * canvas.width, .190 * canvas.height);
    ctx.lineTo(.540 * canvas.width, .190 * canvas.height);
    ctx.moveTo(.540 * canvas.width, .190 * canvas.height);
    ctx.lineTo(.555 * canvas.width, .175 * canvas.height);
    ctx.moveTo(.540 * canvas.width, .150 * canvas.height);
    ctx.lineTo(.552 * canvas.width, .175 * canvas.height);
    ctx.moveTo(.552 * canvas.width, .175 * canvas.height);
    ctx.lineTo(.605 * canvas.width, .175 * canvas.height);
    ctx.moveTo(.605 * canvas.width, .175 * canvas.height);
    ctx.lineTo(.617 * canvas.width, .150 * canvas.height);
    ctx.stroke();

    //Draw the PPG section
    ctx.moveTo(.558 * canvas.width, .150 * canvas.height);
    ctx.lineTo(.573 * canvas.width, .1285 * canvas.height);
    ctx.moveTo(.573 * canvas.width, .1285 * canvas.height);
    ctx.lineTo(.583 * canvas.width, .1285 * canvas.height);

//    ctx.lineWidth = 4;
    //Draw the Ross/Front secction
    ctx.moveTo(.765 * canvas.width, .150 * canvas.height);
    ctx.lineTo(.785 * canvas.width, .1285 * canvas.height);
    ctx.moveTo(.785 * canvas.width, .1285 * canvas.height);
    ctx.lineTo(.930 * canvas.width, .1285 * canvas.height);

    //Draw the dash in the SHIP section
    ctx.moveTo(.187 * canvas.width, .141 * canvas.height);
    ctx.lineTo(.197 * canvas.width, .130 * canvas.height);

    //Draw the dashes in the Front section
    ctx.moveTo(.860 * canvas.width, .135 * canvas.height);
    ctx.lineTo(.870 * canvas.width, .143 * canvas.height);
    ctx.moveTo(.890 * canvas.width, .143 * canvas.height);
    ctx.lineTo(.900 * canvas.width, .135 * canvas.height);
    ctx.stroke();

    //draw the section near PPG that is thinner than the rest
    ctx.lineWidth = .75;
    ctx.moveTo(.583 * canvas.width, .1285 * canvas.height);
    ctx.lineTo(.600 * canvas.width, .1285 * canvas.height);
    ctx.stroke();

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

// Creates a new segment of track and an accompanying canvas, and returns it.
// track - the new segment of track
function createTrack(x1, y1, x2, y2,canvas){
	var newCanvas = document.createElement("canvas");
	var lineWidth = 4;
	newCanvas.width = (x2*canvas.width-x1*canvas.width);
	newCanvas.height = (y2*canvas.height-y1*canvas.height);
    window.alert(newCanvas.width + " before " + newCanvas.height)
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
