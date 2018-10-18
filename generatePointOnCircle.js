//#!py
/**
 * @include generateRotateMatrix transformPointByMatrix
 * @param {number} r
 * @param {number} angle
 * @param {array<number>} [origin]
 * @return {array<number>}
 */
function generatePointOnCircle(r, angle, origin)
	let p = [r, 0]
	if angle !== 0
		const matrix = generateRotateMatrix(angle)
		p = transformPointByMatrix(p, matrix)
	if origin
		origin.forEach((v, i)=> p[i] += v)
		
	return p