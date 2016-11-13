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
		ctx.fillText("CSX", 0.02*canvas.width, 0.38*canvas.height);	
		ctx.fillText("Lurgan Sub", 0.02*canvas.width, 0.4*canvas.height);
		ctx.fillText("NS H-Line", 0.02*canvas.width, 0.43*canvas.height);
		ctx.fillText("to Roanoke", 0.02*canvas.width, 0.45*canvas.height);
		ctx.fillText("Lurgan Branch", .398*canvas.width, 0.38*canvas.height);
		ctx.fillText("to Ship", .398*canvas.width, 0.4*canvas.height);

		// Gray, size 12
		ctx.fillStyle = "#d3d3d3";
		ctx.fillText("TOWN", 0.095*canvas.width, 0.47*canvas.height);
		ctx.fillText("CP-67", 0.22*canvas.width, 0.4*canvas.height);
		ctx.fillText("CP-65", 0.26*canvas.width, 0.4*canvas.height);
		ctx.fillText("CP-64", 0.288*canvas.width, 0.47*canvas.height);
		ctx.fillText("CP-62", 0.31*canvas.width, 0.47*canvas.height);
		ctx.fillText("CP-53", 0.36*canvas.width, 0.47*canvas.height);
		ctx.fillText("CP-50", 0.4*canvas.width, 0.47*canvas.height);
		// Orange, size 10
		ctx.font = ("0.8em Arial");
		ctx.fillStyle = "#ffa500";
		ctx.fillText("NS Industrial Lead", 0.201*canvas.width, 0.510*canvas.height);
		ctx.fillText("CSX Lurgan Sub", 0.201*canvas.width, 0.47*canvas.height);
		ctx.fillText("CSX Hanover Sub", 0.201*canvas.width, 0.49*canvas.height);
		ctx.fillText("Greencastle Yard", 0.245*canvas.width, 0.475*canvas.height);
		return this;
};

drawLurganToShip.prototype.drawLTSTrack = function(canvas, ctx){
		//concept for storage of track segments - needed for recoloring?
		//var trackseg = ["mnemonic", x, y, x2, y2]

		// Draw Track - Nearby text on original layout listed in comments
		ctx.lineWidth = 4;
		ctx.strokeStyle = "white";
		// CSX
		ctx.moveTo(.058*canvas.width, .370*canvas.height);
		ctx.lineTo(.093*canvas.width, .370*canvas.height);
		var trackseg1 = ["", .058, .370, .093, .370]
		ctx.stroke();
		ctx.lineTo(.103*canvas.width, .385*canvas.height);
		ctx.stroke();
		// Lurgan Sub
		ctx.moveTo(.058*canvas.width, .395*canvas.height);
		ctx.lineTo(.118*canvas.width, .395*canvas.height);
		ctx.stroke();
		ctx.lineTo(.143*canvas.width, .435*canvas.height);
		// NS H-Line
		ctx.moveTo(.058*canvas.width, .420*canvas.height);
		ctx.lineTo(.098*canvas.width, .420*canvas.height);
		ctx.stroke();
		ctx.lineTo(.108*canvas.width, .435*canvas.height);
		ctx.stroke();
		// to Roanoke
		ctx.moveTo(.058*canvas.width, .440*canvas.height);
		ctx.lineTo(.430*canvas.width, .440*canvas.height);
		ctx.stroke();
		// NS Industrial Lead
		ctx.moveTo(.133*canvas.width, .440*canvas.height);
		ctx.lineTo(.168*canvas.width, .500*canvas.height);
		ctx.stroke();
		ctx.lineTo(.200*canvas.width, .500*canvas.height);
		ctx.stroke();
		// CSX Lurgan Sub
		ctx.moveTo(.155*canvas.width, .440*canvas.height);
		ctx.lineTo(.168*canvas.width, .460*canvas.height);
		ctx.stroke();
		ctx.lineTo(.200*canvas.width, .460*canvas.height);
		ctx.stroke();
		// CSX Hanover Sub
		ctx.moveTo(.180*canvas.width, .460*canvas.height);
		ctx.lineTo(.193*canvas.width, .480*canvas.height);
		ctx.stroke();
		ctx.lineTo(.200*canvas.width, .480*canvas.height);
		ctx.stroke();
		// Greencastle Yard
		ctx.moveTo(.220*canvas.width, .440*canvas.height);
		ctx.lineTo(.233*canvas.width, .460*canvas.height);
		ctx.stroke();
		ctx.lineTo(.280*canvas.width, .460*canvas.height);
		ctx.stroke();
		ctx.lineTo(.293*canvas.width, .440*canvas.height);
		ctx.stroke();
		// CP-65 to CP-62
		ctx.moveTo(.255*canvas.width, .440*canvas.height);
		ctx.lineTo(.268*canvas.width, .420*canvas.height);
		ctx.stroke();
		ctx.lineTo(.315*canvas.width, .420*canvas.height);
		ctx.stroke();
		ctx.lineTo(.328*canvas.width, .440*canvas.height);
		ctx.stroke();
		// Near CP-53 and CP-50
		ctx.moveTo(.370*canvas.width, .440*canvas.height);
		ctx.lineTo(.383*canvas.width, .420*canvas.height);
		ctx.stroke();
		ctx.lineTo(.398*canvas.width, .420*canvas.height);
		ctx.stroke();
		ctx.lineTo(.41*canvas.width, .440*canvas.height);
		ctx.stroke();

		return this;
};

drawLurganToShip.prototype.drawLTSControlPoints = function(canvas, ctx){
	return this;
};
	
drawLurganToShip.prototype.draw = function(canvas, ctx){
		this.drawLTSTrack(canvas, ctx);
		this.drawLTSText(canvas, ctx);
		this.drawLTSControlPoints(canvas, ctx);
		return this;
};

// Draws Burke to Wyomissing Segment
var drawBurkeToWyomissing = function(){
};

drawBurkeToWyomissing.prototype.drawBTWText = function(canvas, ctx){

    //orange, size 12
    ctx.font = ("1em Arial");
	ctx.fillStyle = "#ffa500";
    ctx.fillText("Harrisburg Line", .04 * canvas.width, .525 * canvas.height);
    ctx.fillText("to RUTH", .04 * canvas.width, .545 * canvas.height);

    ctx.fillText("Harrisburg Line", .04 * canvas.width, .655 * canvas.height);
    ctx.fillText("to BEAVER", .04 * canvas.width, .675 * canvas.height);
    //gray size 12
    ctx.fillStyle = "#d3d3d3";
    ctx.fillText("BURKE", .05 * canvas.width, .630 * canvas.height);

    //orange size 10
    ctx.font = ("0.8em Arial");

	return this;
};

drawBurkeToWyomissing.prototype.drawBTWTrack = function(canvas, ctx){
	ctx.lineWidth = 4;
	ctx.strokeStyle = "white";
	//Burke and Ruth
	ctx.moveTo(.04 *canvas.width, .575*canvas.height);
	ctx.lineTo(.595 *canvas.width, .575*canvas.height);
	ctx.stroke();
    ctx.moveTo(.04 *canvas.width, .595*canvas.height);
	ctx.lineTo(.595 *canvas.width, .595*canvas.height);
	ctx.stroke();
	//Quarry section
	ctx.moveTo(.11 * canvas.width, .550 * canvas.height);
	ctx.lineTo(.17 * canvas.width, .550 * canvas.height);
	ctx.stroke();
	ctx.moveTo(.17 * canvas.width, .550 * canvas.height);
	ctx.lineTo(.21 * canvas.width, .575 * canvas.height)
	ctx.stroke();
	//Dunkle area
	//Draws the arc above Wyomissing JCT and under Dunkle
	ctx.moveTo(.475 * canvas.width, .575 * canvas.height); //   /
	ctx.lineTo(.495 * canvas.width, .550 * canvas.height);
	ctx.stroke();
	ctx.moveTo(.495 * canvas.width, .550 * canvas.height);// ---
	ctx.lineTo(.535 * canvas.width, .550 * canvas.height);
    ctx.stroke();
    ctx.moveTo(.535 * canvas.width, .550 * canvas.height);// \
    ctx.lineTo(.555 * canvas.width, .575 * canvas.height);
    ctx.stroke();
    ctx.moveTo(.507 * canvas.width, .550 * canvas.height);// /
    ctx.lineTo(.525 * canvas.width, .525 * canvas.height);
    ctx.stroke();
    ctx.moveTo(.525 * canvas.width, .525 * canvas.height);// ---
    ctx.lineTo(.540 * canvas.width, .525 * canvas.height);
    ctx.stroke();
    ctx.moveTo(.540 * canvas.width, .525 * canvas.height); // /
    ctx.lineTo(.555 * canvas.width, .51 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.555 * canvas.width, .51 * canvas.height); // | up part of Dunkle starting loop
    ctx.lineTo(.555 * canvas.width, .40 * canvas.height);
    ctx.stroke();
    ctx.moveTo(.555 * canvas.width, .40 * canvas.height); // / upper left corner of loop (outside part)
    ctx.lineTo(.570 * canvas.width, .37 * canvas.height);
    ctx.stroke();
    ctx.moveTo(.570 * canvas.width, .37 * canvas.height);// --- long portion of the top part of the loop
    ctx.lineTo(.820 * canvas.width, .37 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.566 * canvas.width, .41 * canvas.height); //inner part of the top left corner loop
    ctx.lineTo(.576 * canvas.width, .39 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.566 * canvas.width, .41 * canvas.height); // | inner part of the left side
    ctx.lineTo(.566 * canvas.width, .64 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.555 * canvas.width, .575 * canvas.height); // | down pat of Dunkle starting loop
    ctx.lineTo(.555 * canvas.width, .645 * canvas.height);
    ctx.stroke();
	return this;
};

drawBurkeToWyomissing.prototype.drawBTWControlPoints = function(canvas, ctx){
	return this;
};

drawBurkeToWyomissing.prototype.draw = function(canvas, ctx){

	this.drawBTWTrack(canvas, ctx);
	this.drawBTWText(canvas, ctx);
	this.drawBTWControlPoints(canvas, ctx);
	return this;
};

// Draw Cannon to Beaver Segment
var drawCannonToBeaver = function() {
};

drawCannonToBeaver.prototype.drawCTBText = function(canvas, ctx){
	// Gray, size 12
	ctx.fillStyle = "#d3d3d3";
	ctx.fillText("CANNON", 0.016*canvas.width, 0.136*canvas.height);
	return this;
};

drawCannonToBeaver.prototype.drawCTBTrack = function(canvas, ctx){
	ctx.lineWidth = 4;
	ctx.strokeStyle = "white";
	// Cannon to Banks
	ctx.moveTo(.005*canvas.width, .1*canvas.height); // Straight rails
	ctx.lineTo(.113*canvas.width, .1*canvas.height);
	ctx.stroke();
	ctx.moveTo(.005*canvas.width, .12*canvas.height);
	ctx.lineTo(.125*canvas.width, .12*canvas.height);
	ctx.stroke();
	ctx.moveTo(.035*canvas.width, .105*canvas.height); // Diagonals connecting straight rails
	ctx.lineTo(.04*canvas.width, .115*canvas.height);
	ctx.stroke();
	ctx.moveTo(.055*canvas.width, .105*canvas.height);
	ctx.lineTo(.05*canvas.width, .115*canvas.height);
	ctx.stroke();
	ctx.moveTo(.06*canvas.width, .125*canvas.height); // Underlying bracket
	ctx.lineTo(.065*canvas.width, .135*canvas.height);
	ctx.stroke();
	ctx.moveTo(.065*canvas.width, .135*canvas.height); 
	ctx.lineTo(.1*canvas.width, .135*canvas.height);
	ctx.stroke();
	ctx.moveTo(.1*canvas.width, .135*canvas.height); 
	ctx.lineTo(.105*canvas.width, .125*canvas.height);
	ctx.stroke();
	// Banks to Stoney
	ctx.moveTo(.113*canvas.width, .1*canvas.height); // Ramp to top rail
	ctx.lineTo(.121*canvas.width, .09*canvas.height);
	ctx.stroke();
	ctx.moveTo(.121*canvas.width, .09*canvas.height); 
	ctx.lineTo(.19*canvas.width, .09*canvas.height); // Top rail
	ctx.stroke();
	ctx.moveTo(.19*canvas.width, .09*canvas.height); 
	ctx.lineTo(.205*canvas.width, .12*canvas.height); // Ramp down from top rail
	ctx.stroke();
	ctx.moveTo(.12*canvas.width, .12*canvas.height); // Left mid rail 
	ctx.lineTo(.125*canvas.width, .11*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.125*canvas.width, .11*canvas.height); 
	ctx.lineTo(.135*canvas.width, .11*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.135*canvas.width, .11*canvas.height); 
	ctx.lineTo(.14*canvas.width, .09*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.15*canvas.width, .09*canvas.height); // Right mid rail
	ctx.lineTo(.155*canvas.width, .1*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.155*canvas.width, .1*canvas.height); 
	ctx.lineTo(.185*canvas.width, .1*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.185*canvas.width, .1*canvas.height); 
	ctx.lineTo(.185*canvas.width, .1*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.185*canvas.width, .1*canvas.height); 
	ctx.lineTo(.199*canvas.width, .13*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.130*canvas.width, .11*canvas.height); // Lower mid rail
	ctx.lineTo(.135*canvas.width, .12*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.135*canvas.width, .12*canvas.height); 
	ctx.lineTo(.18*canvas.width, .12*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.18*canvas.width, .12*canvas.height); 
	ctx.lineTo(.185*canvas.width, .13*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.135*canvas.width, .11*canvas.height); 
	ctx.lineTo(.14*canvas.width, .09*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.125*canvas.width, .12*canvas.height); 
	ctx.lineTo(.133*canvas.width, .135*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.133*canvas.width, .135*canvas.height); 
	ctx.lineTo(.502*canvas.width, .135*canvas.height); 
	ctx.stroke();
	// Mary to Hip
	ctx.moveTo(.184*canvas.width, .140*canvas.height); // Left ramp down
	ctx.lineTo(.189*canvas.width, .150*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.203*canvas.width, .140*canvas.height); // Right ramp down
	ctx.lineTo(.198*canvas.width, .150*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.191*canvas.width, .140*canvas.height); // Crossing right ramp
	ctx.lineTo(.196*canvas.width, .150*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.200*canvas.width, .155*canvas.height); // Crossing over right ramp
	ctx.lineTo(.210*canvas.width, .178*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.189*canvas.width, .150*canvas.height); // Left line down 
	ctx.lineTo(.189*canvas.width, .210*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.198*canvas.width, .150*canvas.height); // Right line down 
	ctx.lineTo(.198*canvas.width, .203*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.189*canvas.width, .210*canvas.height); // Left Curve 
	ctx.lineTo(.198*canvas.width, .230*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.198*canvas.width, .203*canvas.height); // Right Curve 
	ctx.lineTo(.203*canvas.width, .213*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.203*canvas.width, .213*canvas.height); // Top line through CP-111L
	ctx.lineTo(.335*canvas.width, .213*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.198*canvas.width, .230*canvas.height); // Bottom line through CP-111L
	ctx.lineTo(.335*canvas.width, .230*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.232*canvas.width, .228*canvas.height); // Left HIP ramp 
	ctx.lineTo(.237*canvas.width, .218*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.250*canvas.width, .228*canvas.height); // Right HIP ramp 
	ctx.lineTo(.245*canvas.width, .218*canvas.height); 
	ctx.stroke();
	// Lines above HIP and CP-111L
	ctx.moveTo(.209*canvas.width, .150*canvas.height); // Top ramp down
	ctx.lineTo(.214*canvas.width, .160*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.214*canvas.width, .160*canvas.height); // Top line to X-crossing
	ctx.lineTo(.253*canvas.width, .160*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.210*canvas.width, .178*canvas.height); // Bottom line to X-crossing
	ctx.lineTo(.253*canvas.width, .178*canvas.height); 
	ctx.stroke();	
	ctx.moveTo(.253*canvas.width, .160*canvas.height); // X-Crossing
	ctx.lineTo(.261*canvas.width, .178*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.253*canvas.width, .178*canvas.height);
	ctx.lineTo(.256*canvas.width, .175*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.259*canvas.width, .165*canvas.height);
	ctx.lineTo(.261*canvas.width, .160*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.261*canvas.width, .160*canvas.height); // Top line to CP-111L
	ctx.lineTo(.335*canvas.width, .160*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.261*canvas.width, .178*canvas.height); // Bottom line to CP-111L
	ctx.lineTo(.335*canvas.width, .178*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.320*canvas.width, .165*canvas.height); // Top and Bottom Bridging Ramp
	ctx.lineTo(.325*canvas.width, .175*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.315*canvas.width, .180*canvas.height); // Second and Third Line Bridging Ramp
	ctx.lineTo(.310*canvas.width, .190*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.283*canvas.width, .198*canvas.height); // Third and Fourth Line Bridging Ramp
	ctx.lineTo(.278*canvas.width, .208*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.227*canvas.width, .165*canvas.height); // Left bridging ramp
	ctx.lineTo(.232*canvas.width, .175*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.227*canvas.width, .182*canvas.height); // Ramp down to third rail
	ctx.lineTo(.233*canvas.width, .194*canvas.height); 
	ctx.stroke();
	ctx.moveTo(.233*canvas.width, .194*canvas.height); // Third rail
	ctx.lineTo(.335*canvas.width, .194*canvas.height); 
	ctx.stroke();
	return this;
};

drawCannonToBeaver.prototype.drawCTBControlPoints = function(canvas, ctx){
	return this;	
};

drawCannonToBeaver.prototype.draw = function(canvas, ctx){
	this.drawCTBTrack(canvas, ctx);
	this.drawCTBText(canvas, ctx);
	this.drawCTBControlPoints(canvas, ctx);
	return this;
};


// Takes in the given coordinates and redraws them to match data.
// tinfo - array containing the given info on the track segment\
//  tinfo[0-3] - starting and ending coordinates - in the form of decimal values that will be multiplied by the canvas'
//				 width and height. t[0]=x1, t[1]=y1, t[2]=x2. t[3]=y2
//  tinfo[4] - track color
// canvas - the map's canvas
// ctx - the canvas' context
function changeTrack(tinfo, canvas, ctx){
	ctx.strokeStyle = tinfo[4];
	ctx.moveTo(tinfo[0]*canvas.width, tinfo[1]*canvas.width);
	ctx.lineTo(tinfo[2]*canvas.width, tinfo[3]*canvas.width);
	ctx.stroke();
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
	var dbtw = new drawBurkeToWyomissing();
	var dctb = new drawCannonToBeaver();
	dlts.draw(canvas, ctx);
	dbtw.draw(canvas, ctx);
	dctb.draw(canvas, ctx);
})
	