
Raphael.fn.drawGraph = function() {
	var set = this.set();

	var h = paper.height;
	var w = paper.width;

	var p = [
	    // ["M", 0, h/2],
	    // ["L", w, h/2],
	    ["M", w/2, 0],
	    ["L", w/2, h]
	 ];

	set.push(this.path(p));
	return set;
}

// isn't a true sine wave
Raphael.fn.drawBezierSine = function () {

	var set = this.set();

	var h = paper.height;
	var w = paper.width;

	var p = [
	    ["M", 0, h/2],
	    ["Q", w/4, 0, w/2, h/2],
	  	["Q", w*3/4, h, w, h/2],  
	];
	set.push(this.path(p).attr({stroke: "green"}));

	return set;
}
Raphael.fn.drawSine = function (time) {

	if (time == undefined) { time = 0; }
	var set = this.set();

	var stroke = 5;
	var hpadding = 5;
	var w = paper.width - (hpadding*2);
	var h = paper.height;

	var p = [];

	for(var i = (0); i <= (w); i++){

		var radians = (i+((w)/2)) * (Math.PI/((w)/2));

		var y = Math.sin(radians - time);
		y = y*((h/2)-Math.ceil(stroke/2)) + (h/2);

		command = (i == 0) ? "M" : "L";
		p.push([command, i+ hpadding, y]);
	}

	set.push(this.path(p).attr({"stroke": "blue", "stroke-width": stroke, "stroke-linecap": "round"}));

	return set;
}


var paper = Raphael(0, 100, 500, 250);


setInterval(function(){

	paper.clear();
	var d = new Date();
	var seconds = d.getSeconds();
	var secondsRadians = -seconds * (Math.PI / 30);
	console.log(seconds);
	paper.drawSine(secondsRadians);
	paper.drawGraph();

}, 1000);



