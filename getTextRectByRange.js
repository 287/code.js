/**
 * @include createSelectionRange, getNodeOffset
 * @param {textnode} textNode
 * @return {object}
 */
function getTextRectByRange(textNode, range){
	range = createSelectionRange(textNode, range);
	let rangeRect = range.getBoundingClientRect();
	let pNodeRect = textNode.parentNode.getBoundingClientRect();
	let offset = getNodeOffset(textNode.parentNode);
	const rect = {
		width: rangeRect.width,
		height: rangeRect.height,
		left: rangeRect.left - pNodeRect.left + offset[0],
		top: rangeRect.top - pNodeRect.top + offset[1],
	};
	return rect;
}