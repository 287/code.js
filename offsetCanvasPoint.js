/**
 * *************************************************
 * @type lineTo
 * @input-params [x, y]
 * @input-length 2
 *
 * @type arcTo
 * @input-params [controlPointX, controlPointY, x, y, radius]
 * @input-length 5
 *
 * @type quadraticCurveTo
 * @input-params [controlPointX, controlPointY, x, y]
 * @input-length 4
 *
 * @type arc
 * @input-params [x, y, r, startAngle, endAngle, reverse]
 * @input-length 6
 *
 * @type bezierCurveTo
 * @input-params [controlPointOneX, controlPointOneY, controlPointTwoX, controlPointTwoY, x, y]
 * @input-length 6
 * *************************************************
 * @include isBoolean
 * @param {array} p
 * @param {array} offset
 * @return {array}
 */
function offsetCanvasPoint(p, offset){
	let len = p.length;
	if(len === 6){
		if(isBoolean(p[p.length -1])){
			len = 2;
		}
	}else if(len === 5){
		len = 2;
	}
	p = p.slice(0);
	
	for(let i = 0; i < len; i++){
		p[i] += offset[i % 2];
	}
	return p;
}