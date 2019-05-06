//#!py
/**
 * @include generateTwoPointsByRect
 * @param {object} rect
 * @param {number} rect.left
 * @param {number} rect.top
 * @param {number} rect.width
 * @param {number} rect.height
 * @param {object} rect2
 * @param {number} rect2.left
 * @param {number} rect2.top
 * @param {number} rect2.width
 * @param {number} rect2.height
 * @return {boolean}
 */
function isRectContainsRect(rect, rect2)
	const p = [rect, rect2].map(rect=> generateTwoPointsByRect(rect))
	console.log(p)
	
	for 2 as i
		if p[0][0][i] > p[1][0][i]
			return false
			
	for 2 as i
		if p[0][1][i] < p[1][1][i]
			return false
			
	return true