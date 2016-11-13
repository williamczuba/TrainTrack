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
		ctx.moveTo(.116*canvas.width, .470*canvas.height);
		ctx.lineTo(.186*canvas.width, .470*canvas.height);
		ctx.stroke();
		ctx.lineTo(.206*canvas.width, .485*canvas.height);
		ctx.stroke();
		// Lurgan Sub
		ctx.moveTo(.116*canvas.width, .495*canvas.height);
		ctx.lineTo(.236*canvas.width, .495*canvas.height);
		ctx.stroke();
		ctx.lineTo(.286*canvas.width, .535*canvas.height);
		// NS H-Line
		ctx.moveTo(.116*canvas.width, .520*canvas.height);
		ctx.lineTo(.196*canvas.width, .520*canvas.height);
		ctx.stroke();
		ctx.lineTo(.216*canvas.width, .535*canvas.height);
		ctx.stroke();
		// to Roanoke
		ctx.moveTo(.116*canvas.width, .540*canvas.height);
		ctx.lineTo(.86*canvas.width, .540*canvas.height);
		ctx.stroke();
		// NS Industrial Lead
		ctx.moveTo(.266*canvas.width, .540*canvas.height);
		ctx.lineTo(.336*canvas.width, .600*canvas.height);
		ctx.stroke();
		ctx.lineTo(.400*canvas.width, .600*canvas.height);
		ctx.stroke();
		// CSX Lurgan Sub
		ctx.moveTo(.310*canvas.width, .540*canvas.height);
		ctx.lineTo(.336*canvas.width, .560*canvas.height);
		ctx.stroke();
		ctx.lineTo(.400*canvas.width, .560*canvas.height);
		ctx.stroke();
		// CSX Hanover Sub
		ctx.moveTo(.360*canvas.width, .560*canvas.height);
		ctx.lineTo(.386*canvas.width, .580*canvas.height);
		ctx.stroke();
		ctx.lineTo(.400*canvas.width, .580*canvas.height);
		ctx.stroke();
		// Greencastle Yard
		ctx.moveTo(.440*canvas.width, .540*canvas.height);
		ctx.lineTo(.466*canvas.width, .560*canvas.height);
		ctx.stroke();
		ctx.lineTo(.560*canvas.width, .560*canvas.height);
		ctx.stroke();
		ctx.lineTo(.586*canvas.width, .540*canvas.height);
		ctx.stroke();
		// CP-65 to CP-62
		ctx.moveTo(.510*canvas.width, .540*canvas.height);
		ctx.lineTo(.536*canvas.width, .520*canvas.height);
		ctx.stroke();
		ctx.lineTo(.630*canvas.width, .520*canvas.height);
		ctx.stroke();
		ctx.lineTo(.656*canvas.width, .540*canvas.height);
		ctx.stroke();
		// Near CP-53 and CP-50
		ctx.moveTo(.740*canvas.width, .540*canvas.height);
		ctx.lineTo(.766*canvas.width, .520*canvas.height);
		ctx.stroke();
		ctx.lineTo(.796*canvas.width, .520*canvas.height);
		ctx.stroke();
		ctx.lineTo(.820*canvas.width, .540*canvas.height);
		ctx.stroke();
		return this;
};

// Draws control points for the Lurgan to Ship region - draw the "off" graphic in the proper direction by default
drawLurganToShip.prototype.drawLTSControlPoints = function(canvas, ctx){
	var cpr = document.getElementByID("cproff")
	var cpl = document.getElementByID("cploff")
	ctx.drawImage(
	return this;
};
	
drawLurganToShip.prototype.draw = function(canvas, ctx){
		this.drawLTSTrack(canvas, ctx);
		this.drawLTSText(canvas, ctx);
		this.drawLTSControlPoints(canvas, ctx);
		return this;
};
/* May not be needed, unless drawing full map
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
	//Burke to Ruth 2
    ctx.moveTo(.04 *canvas.width, .595*canvas.height);
	ctx.lineTo(.595 *canvas.width, .595*canvas.height);
	ctx.stroke();
	//Quarry section
	ctx.moveTo(.11 * canvas.width, .550 * canvas.height); //draw the straight part
	ctx.lineTo(.17 * canvas.width, .550 * canvas.height);
	ctx.stroke();
	ctx.moveTo(.17 * canvas.width, .550 * canvas.height); //draw the sloped part
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
    ctx.lineTo(.880 * canvas.width, .37 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.566 * canvas.width, .41 * canvas.height); //inner part of the top left corner loop
    ctx.lineTo(.576 * canvas.width, .39 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.566 * canvas.width, .41 * canvas.height); // | inner part of the left side
    ctx.lineTo(.566 * canvas.width, .64 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.576 * canvas.width, .39 * canvas.height); // --- horizontal inner part of top left corner moving towards West Laurel
    ctx.lineTo(.593 * canvas.width, .39 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.593 * canvas.width, .39 * canvas.height); //upward sloping part of the inner ramp near Tulp
    ctx.lineTo(.603 * canvas.width, .37 * canvas.height);
    ctx.stroke();


    ctx.moveTo(.555 * canvas.width, .575 * canvas.height); // | down pat of Dunkle starting loop
    ctx.lineTo(.555 * canvas.width, .645 * canvas.height);
    ctx.stroke();

   //new stuff 11/12
    ctx.moveTo(.629 * canvas.width, .37 * canvas.height); //draw the first part of the loop near Tulp
    ctx.lineTo(.649 * canvas.width, .35 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.649 * canvas.width, .35 * canvas.height); //draw the long part of the loop near Tulp
    ctx.lineTo(.770 * canvas.width, .35 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.770 * canvas.width, .35 * canvas.height); //draw the going down part of the loop near Tulp
    ctx.lineTo(.790 * canvas.width, .37 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.830 * canvas.width, .37 * canvas.height); //draw the start of the ramp near West Laurel
    ctx.lineTo(.850 * canvas.width, .35 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.850 * canvas.width, .35 * canvas.height); //draw the straight part of the ramp near West Laurel
    ctx.lineTo(.870 * canvas.width, .35 * canvas.height);
    ctx.stroke();


    ctx.moveTo(.710 * canvas.width, .39 * canvas.height); //draw the downward slope from near Belt towards Reading Yard
    ctx.lineTo(.720 * canvas.width, .37 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.710 * canvas.width, .39 * canvas.height); //draw the downward slope from near Belt towards Reading Yard
    ctx.lineTo(.665 * canvas.width, .39 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.695 * canvas.width, .39 * canvas.height); //draw the start of the outer part of the 'S' shape naer Pottsville Branch
    ctx.lineTo(.685 * canvas.width, .41 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.705 * canvas.width, .39 * canvas.height); //draw the start of the outer part of the 'S' shape naer Pottsville Branch
    ctx.lineTo(.685 * canvas.width, .43 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.685 * canvas.width, .41 * canvas.height); //draw the top of the outer part of the 'S'
    ctx.lineTo(.605 * canvas.width, .41 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.685 * canvas.width, .43 * canvas.height); //draw the top of the inner part of the 'S'
    ctx.lineTo(.610 * canvas.width, .43 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.605 * canvas.width, .41 * canvas.height); //draw the outer edge of the top left hand corner of the 'S'
    ctx.lineTo(.590 * canvas.width, .44 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.610 * canvas.width, .43 * canvas.height); //draw the inner edge of the top left hand corner of the 'S'
    ctx.lineTo(.600 * canvas.width, .45 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.590 * canvas.width, .44 * canvas.height); //draw the down section of the outer part of the 'S'
    ctx.lineTo(.590 * canvas.width, .49 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.600 * canvas.width, .45 * canvas.height); //draw the down section of the innner part of the 'S'
    ctx.lineTo(.600 * canvas.width, .48 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.590 * canvas.width, .49 * canvas.height); //draw the downward corner of the outer part of the 'S'
    ctx.lineTo(.605 * canvas.width, .52 * canvas.height);
    ctx.stroke();

    ctx.moveTo(.600 * canvas.width, .48 * canvas.height);
    ctx.lineTo(.610 * canvas.width, .50 * canvas.height);
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
*/

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
	//var dbtw = new drawBurkeToWyomissing();
	//var dctb = new drawCannonToBeaver();
	dlts.draw(canvas, ctx);
	//dbtw.draw(canvas, ctx);
	//dctb.draw(canvas, ctx);
})
	