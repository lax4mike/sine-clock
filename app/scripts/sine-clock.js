
Raphael.fn.drawGraph = function() {
	var set = this.set();

	var h = paper.height;
	var w = paper.width;

	var p = [
	    ["M", 0, h/2],
	    ["L", w, h/2],
	    ["M", w/2, 0],
	    ["L", w/2, h]
	 ];

	 this.circle(w/4, h/4, 1);

	set.push(this.path(p));
	return set;
}

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
Raphael.fn.drawSine = function () {

	var set = this.set();

	var h = paper.height;
	var w = paper.width;

	var p = [
	    ["M", 0, h/2]
	];

	for(var i = 0; i <= w; i++){

		var x = (i+180) * (Math.PI/180);
		var y = Math.sin(x);
		y = y*(h/4) + (h/2);
		console.log(i, ": ", x,  y);
		p.push(["L", i, y]);
	}

	set.push(this.path(p).attr({stroke: "red"}));

	return set;
}


var paper = Raphael(0, 100, 360, 360);
paper.drawGraph();
paper.drawBezierSine();
paper.drawSine();

