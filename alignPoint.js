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
 * @param {array<number>} p
 * @param {array<number>} offset
 * @return {array<number>}
 */
function offsetCanvasPoint(type, p, offset){
	const typeLens = {arc: 2, arcTo: 4};
	let len = typeLens[type] || p.length;
	p = p.slice(0);
	for(let i = 0; i < len; i++){
		p[i] = Math.round(p[i]) + offset[i % 2];
	}
	return p;
}