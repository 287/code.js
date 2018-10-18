//#!py
/**
 * *****************************
 * a  c  e     x     ax + cy + e
 * b  d  f  *  y  =  bx + dy + f
 * -----------------------------
 * 0  0  1     1     0  + 0  + 1
 * *****************************
 * @include fixNumber
 * @param {array<number>} p
 * @param {array<number>} matrix - [a, b, c, d, e, f]
 * @return {array}
 */
function transformPointByMatrix(p, matrix)
	return [0, 1].map(i=> fixNumber(matrix[i] * p[0] + matrix[i + 2] * p[1] + matrix[i + 4]))