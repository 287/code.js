//#!py
/**
 * @param {point<number>} p
 * @param {object|array<array<number>>} rect
 * @param {number} rect.left
 * @param {number} rect.top
 * @param {number} rect.width
 * @param {number} rect.height
 * @return {boolean}
 */
function isPonitInRect(p, points){
	if !isArray(points)
		const rect = points
		points = [[rect.left, rect.top], [rect.left + rect.width, rect.top + rect.height]]
		
	for let i = 0; i < 2; i++
		if p[i] < points[0][i] || p[i] > points[1][i]
			return false
	
	return true