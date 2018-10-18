/**
 * @param {object} rect
 * @param {number} rect.left
 * @param {number} rect.top
 * @param {number} rect.width
 * @param {number} rect.height
 * @param {number} [leftPercent = 0] - 0 to 1
 * @param {number} [topPercent = 0] - 0 to 1
 * @return {array<number>}
 */
function getPointInRectByPosition(rect, leftPercent = 0, topPercent = 0){
	return [
		rect.left + rect.width * leftPercent,
		rect.top + rect.height * topPercent,
	];
}