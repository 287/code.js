//#!py
/**
 * @include deg2rad
 * @param {number} angle
 * @return {array<number>}
 */
function generateRotateMatrix(angle)
	const rad = deg2rad(angle)
	const [cos, sin] = ['cos', 'sin'].map(key=> Math[key](rad))
	return [cos, sin, -sin, cos, 0, 0]