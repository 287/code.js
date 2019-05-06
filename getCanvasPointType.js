//#!py
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
function getCanvasPointType(p, i)
	let type = 'lineTo'
	
	select p.length
		case 2
			if i === 0
				type = 'moveTo'
		case 4
			type = 'quadraticCurveTo'
		case 6
			type = 'bezierCurveTo'
		case 7
			type = 'arc'
			
	return type