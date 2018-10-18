function getSlopeByTwoPoint(origin, p){
	var y = p[1] - origin[1];
	var x = p[0] - origin[0];
	var slope = y / x;
	return slope;
}