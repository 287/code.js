/**
 * @include getLengthOfTwoPoint
 * @param {middlePoint} prevPoint
 * @param {middlePoint} middlePoint
 * @return {number}
 */
function getFilletControlPoint(prevPoint, middlePoint, nextPoint, r, type){
	var controlPoints = [];
	var lenA = getLengthOfTwoPoint(prevPoint, middlePoint);
	var lenB = getLengthOfTwoPoint(middlePoint, nextPoint);
	var lenC = getLengthOfTwoPoint(prevPoint, nextPoint);
	var angle = Math.acos((Math.pow(lenA, 2) + Math.pow(lenB, 2) - Math.pow(lenC, 2)) / (2 * lenA * lenB));
	var radius, len, ratio;
	type = type === 'radius' ? type : 'length';
	if(type === 'length'){
		len = r;
		radius = Math.tan(angle / 2) * len;
	}else{
		radius = r;
		len = radius / Math.tan(angle / 2);
	}
	
	ratio = (lenA - len) / lenA;
	controlPoints.push([prevPoint[0] + (middlePoint[0] - prevPoint[0]) * ratio, prevPoint[1] + (middlePoint[1] - prevPoint[1]) * ratio]);
	
	ratio = len / lenB;
	controlPoints.push([middlePoint[0] + (nextPoint[0] - middlePoint[0]) * ratio, middlePoint[1] + (nextPoint[1] - middlePoint[1]) * ratio]);
	
	controlPoints.push(radius);
	
	return controlPoints;
}