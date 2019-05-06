//#!py
/**
 * @include generateRotateMatrix transformPointByMatrix
 * @param {number} r
 * @param {number} angle
 * @param {number} [x]
 * @param {number} [y]
 * @return {array<number>}
 */
function generatePointOnCircle(r, angle, x = 0, y = 0)
	let p = [r, 0]
	if angle !== 0
		const matrix = generateRotateMatrix(angle)
		p = transformPointByMatrix(p, matrix)
		
	p[0] += x
	p[1] += y
		
	return p