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
		ctx.fillText("CSX", 0.04*canvas.width, 0.38*canvas.height);	
		ctx.fillText("Lurgan Sub", 0.04*canvas.width, 0.4*canvas.height);
		ctx.fillText("NS H-Line", 0.04*canvas.width, 0.43*canvas.height);
		ctx.fillText("to Roanoke", 0.04*canvas.width, 0.45*canvas.height);
		ctx.fillText("Lurgan Branch", .795*canvas.width, 0.38*canvas.height);
		ctx.fillText("to Ship", .795*canvas.width, 0.4*canvas.height);
		// Gray, size 12
		ctx.fillStyle = "#d3d3d3";
		ctx.fillText("TOWN", 0.19*canvas.width, 0.47*canvas.height);
		ctx.fillText("CP-67", 0.44*canvas.width, 0.4*canvas.height);
		ctx.fillText("CP-65", 0.52*canvas.width, 0.4*canvas.height);
		ctx.fillText("CP-64", 0.575*canvas.width, 0.47*canvas.height);
		ctx.fillText("CP-62", 0.62*canvas.width, 0.47*canvas.height);
		ctx.fillText("CP-53", 0.72*canvas.width, 0.47*canvas.height);
		ctx.fillText("CP-50", 0.8*canvas.width, 0.47*canvas.height);
		// Orange, size 10
		ctx.font = ("0.8em Arial");
		ctx.fillStyle = "#ffa500";
		ctx.fillText("NS Industrial Lead", 0.402*canvas.width, 0.505*canvas.height);
		ctx.fillText("CSX Lurgan Sub", 0.402*canvas.width, 0.465*canvas.height);
		ctx.fillText("CSX Hanover Sub", 0.402*canvas.width, 0.485*canvas.height);
		ctx.fillText("Greencastle Yard", 0.49*canvas.width, 0.475*canvas.height);
		return this;
};

drawLurganToShip.prototype.drawLTSTrack = function(canvas, ctx){
		// Draw Track - Nearby text on original layout listed in comments
		ctx.lineWidth = 4;
		ctx.strokeStyle = "white";
		ctx.beginPath();
		// CSX
		ctx.moveTo(.115*canvas.width, .370*canvas.height);
		ctx.lineTo(.185*canvas.width, .370*canvas.height);
		ctx.stroke();
		ctx.lineTo(.205*canvas.width, .385*canvas.height);
		ctx.stroke();
		// Lurgan Sub
		ctx.moveTo(.115*canvas.width, .395*canvas.height);
		ctx.lineTo(.235*canvas.width, .395*canvas.height);
		ctx.stroke();
		ctx.lineTo(.285*canvas.width, .435*canvas.height);
		// NS H-Line
		ctx.moveTo(.115*canvas.width, .420*canvas.height);
		ctx.lineTo(.195*canvas.width, .420*canvas.height);
		ctx.stroke();
		ctx.lineTo(.215*canvas.width, .435*canvas.height);
		ctx.stroke();
		// to Roanoke
		ctx.moveTo(.115*canvas.width, .440*canvas.height);
		ctx.lineTo(.860*canvas.width, .440*canvas.height);
		ctx.stroke();
		// NS Industrial Lead
		ctx.moveTo(.265*canvas.width, .440*canvas.height);
		ctx.lineTo(.335*canvas.width, .500*canvas.height);
		ctx.stroke();
		ctx.lineTo(.400*canvas.width, .500*canvas.height);
		ctx.stroke();
		// CSX Lurgan Sub
		ctx.moveTo(.310*canvas.width, .440*canvas.height);
		ctx.lineTo(.335*canvas.width, .460*canvas.height);
		ctx.stroke();
		ctx.lineTo(.400*canvas.width, .460*canvas.height);
		ctx.stroke();
		// CSX Hanover Sub
		ctx.moveTo(.360*canvas.width, .460*canvas.height);
		ctx.lineTo(.385*canvas.width, .480*canvas.height);
		ctx.stroke();
		ctx.lineTo(.400*canvas.width, .480*canvas.height);
		ctx.stroke();
		// Greencastle Yard
		ctx.moveTo(.440*canvas.width, .440*canvas.height);
		ctx.lineTo(.465*canvas.width, .460*canvas.height);
		ctx.stroke();
		ctx.lineTo(.560*canvas.width, .460*canvas.height);
		ctx.stroke();
		ctx.lineTo(.585*canvas.width, .440*canvas.height);
		ctx.stroke();
		// CP-65 to CP-62
		ctx.moveTo(.510*canvas.width, .440*canvas.height);
		ctx.lineTo(.535*canvas.width, .420*canvas.height);
		ctx.stroke();
		ctx.lineTo(.630*canvas.width, .420*canvas.height);
		ctx.stroke();
		ctx.lineTo(.655*canvas.width, .440*canvas.height);
		ctx.stroke();
		// Near CP-53 and CP-50
		ctx.moveTo(.740*canvas.width, .440*canvas.height);
		ctx.lineTo(.765*canvas.width, .420*canvas.height);
		ctx.stroke();
		ctx.lineTo(.795*canvas.width, .420*canvas.height);
		ctx.stroke();
		ctx.lineTo(.820*canvas.width, .440*canvas.height);
		ctx.stroke();
		return this;
};

drawLurganToShip.prototype.drawLTSControlPoints = function(canvas, ctx){
	return this;
}
	
drawLurganToShip.prototype.draw = function(canvas, ctx){
		this.drawLTSTrack(canvas, ctx);
		this.drawLTSText(canvas, ctx);
		this.drawLTSControlPoints(canvas, ctx);
		return this;
};



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
	var dlts = new drawLurganToShip(canvas, ctx);
	dlts.draw(canvas, ctx);
})
	