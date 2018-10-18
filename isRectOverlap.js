/**
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
function isRectOverlap(rect, rect2){
	return !(
		rect2.left > rect.left + rect.width
		|| rect2.left + rect2.width < rect.left
		|| rect2.top > rect.top + rect.height
		|| rect2.top + rect2.height < rect.top
	);
}