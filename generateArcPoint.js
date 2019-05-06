//#!py
/**
 * @include generatePointOnCircle
 * @param {number} x
 * @param {number} y
 * @param {number} r
 * @param {number} startsAngle
 * @param {number} endsAngle
 * @return {array<number>}
 */
function generateArcPoint(...args)
	return generatePointOnCircle(args[2], args[4], args[0], args[1]).concat(args)