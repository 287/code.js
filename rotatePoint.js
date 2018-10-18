//#!py
/**
 * @include isArray generateRotateMatrix transformPointByMatrix
 */
function rotatePoint(p, angle)
	const matrix = isArray(angle) ? angle : generateRotateMatrix(angle)
	return transformPointByMatrix(p, matrix)