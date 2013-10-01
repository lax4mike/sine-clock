$(function(){

	// draw veritcal line in the middle
	Raphael.fn.drawGraph = function() {
		var set = this.set();

		var h = this.height;
		var w = this.width;

		var p = [
		    ["M", 0, h/2],
		    ["L", w, h/2],
		    ["M", w/2, 0],
		    ["L", w/2, h]
		 ];

		set.push(this.path(p));
		return set;
	}

	// isn't a true sine wave, not using, but probably way more effecient to draw
	Raphael.fn.drawBezierSine = function () {

		var set = this.set();

		var h = this.height;
		var w = this.width;

		var p = [
		    ["M", 0, h/2],
		    ["Q", w/4, 0, w/2, h/2],
		  	["Q", w*3/4, h, w, h/2],  
		];
		set.push(this.path(p).attr({stroke: "green"}));

		return set;
	}

	// real sine wave, but the path code is long
	// takes lots of CPU to calculate this at an interval
	Raphael.fn.drawSine = function (startRadians, frequency) {

		if (startRadians == undefined) { startRadians = 0; }
		if (frequency == undefined) { frequency = 1; }

		var set = this.set();

		var stroke = 5;
		var hpadding = 0;
		var w = this.width - (hpadding*2);
		var h = this.height;

		var p = [];

		// for each x in the width of the svg, calculate y of sin wave
		for(var x = (0); x <= (w); x = x+10){

			var radians = (x/(w/2/frequency)) * (Math.PI) - startRadians;

			var y = Math.sin(radians);
			y = -y*((h/2)-Math.ceil(stroke/2)) + (h/2);

			command = (x == 0) ? "M" : "L";
			p.push([command, x + hpadding, y]);

		}

		set.push(this.path(p).attr({"stroke": "blue", "stroke-width": stroke, "stroke-linecap": "butt"}));

		return set;
	}


	var face = {width: 600, height: 250};

	// create svgs and clock-face
	$("<div></div>", { 
		id: "clock-face", 
		css: {
			position: "relative",
			width: face.width, 
			height: face.height,
			overflow: "hidden"
		}
		
	}).appendTo('.container');

	var sineRaphael = Raphael("clock-face", face.width*2, face.height);
	var sine = $(sineRaphael.canvas);
	$(sine).css({'position': 'absolute', 'left': 0});
	sineRaphael.drawSine(Math.PI/2, 2);

	var graphRaphael = Raphael("clock-face", face.width, face.height);
	graphRaphael.drawGraph();

	// number to be displayed on the front end
	var displaySeconds = 0; 

	setInterval(function(){
		
		// Calulate the seconds past the minute with millisecond precision
		var d = new Date();
		var seconds = d.getSeconds();
		var milliSeconds = seconds + (d.getMilliseconds() / 1000);
		// var milliSecondsRadians = -milliSeconds * (Math.PI / 30) + (Math.PI / 2);

		$(sine).css({left: -(milliSeconds/60) * face.width});
		
		// update the frontend seconds if needed
		if (displaySeconds != seconds){
			displaySeconds = seconds;
			$('#seconds').html(displaySeconds)
		}

	}, 100);



});



