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
 * @param {number} i
 * @return {string}
 */
function getCanvasPointType(p, i = 1){
	const types = ['moveTo', 'arc', 'lineTo', , 'quadraticCurveTo', 'arcTo', 'bezierCurveTo'];
	i = i === 0 ? i : p.length !== 6 ? p.length : isBoolean(p[5]) ? 1 : p.length;
	return types[i];
}