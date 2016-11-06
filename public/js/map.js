//Javascript Code for drawing the map.

//Draws Lurgan to SHIP segment
var drawLurganToShip = {
	draw: function(canvas, ctx){
		// Draw Text
		// Orange, size 12
		ctx.font = ("12px Arial");
		ctx.fillStyle = "#ffa500";
		// TODO: Don't hardcode size values as px (ie 40, 380). Always use either em (for font), or %
		//			Otherwise it'll be very difficult to resize to the screen.  If you use %, it will auto resize to fit on any screen.
		ctx.fillText("CSX", 40, 380);	
		ctx.fillText("Lurgan Sub", 40, 400);
		ctx.fillText("NS H-Line", 40, 430);
		ctx.fillText("to Roanoke", 40, 450);
		// Gray, size 12
		ctx.fillStyle = "#d3d3d3";
		ctx.fillText("TOWN", 190, 470);
		// Orange, size 10
		ctx.font = ("10px Arial");
		ctx.fillStyle = "#ffa500";
		ctx.fillText("NS Industrial Lead", 400, 515);
		ctx.fillText("CSX Lurgan Sub", 400, 475);
		ctx.fillText("CSX Hanover Sub", 400, 495);
		ctx.fillText("Greencastle Yard", 495, 475); 
		// Draw Track - Nearby text on original layout listed in comments
		ctx.lineWidth = 4;
		ctx.strokeStyle = "white";
		ctx.beginPath();
		// CSX
		ctx.moveTo(115, 370);
		ctx.lineTo(185, 370);
		ctx.stroke();
		ctx.lineTo(205, 385);
		ctx.stroke();
		// Lurgan Sub
		ctx.moveTo(115, 395);
		ctx.lineTo(235, 395);
		ctx.stroke();
		ctx.lineTo(285, 435);
		// NS H-Line
		ctx.moveTo(115, 420);
		ctx.lineTo(195, 420);
		ctx.stroke();
		ctx.lineTo(215, 435);
		ctx.stroke();
		// to Roanoke
		ctx.moveTo(115, 440);
		ctx.lineTo(860, 440);
		ctx.stroke();
		// NS Industrial Lead
		ctx.moveTo(265, 440);
		ctx.lineTo(335, 500);
		ctx.stroke();
		ctx.lineTo(400, 500);
		ctx.stroke();
		// CSX Lurgan Sub
		ctx.moveTo(310, 440);
		ctx.lineTo(335, 460);
		ctx.stroke();
		ctx.lineTo(400, 460);
		ctx.stroke();
		// CSX Hanover Sub
		ctx.moveTo(360, 460);
		ctx.lineTo(385, 480);
		ctx.stroke();
		ctx.lineTo(400, 480);
		ctx.stroke();
		// Greencastle Yard
		ctx.moveTo(440, 440);
		ctx.lineTo(465, 460);
		ctx.stroke();
		ctx.lineTo(610, 460);
		ctx.stroke();
		ctx.lineTo(635, 440);
		ctx.stroke();
	}
}

// Resizes the Canvas to the full viewport.
$(document).ready(function(){
	var canvas = document.getElementById('mapCanvas');
	var ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
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
	drawLurganToShip.draw(canvas,ctx);
})
	