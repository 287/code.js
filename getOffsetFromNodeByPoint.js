//#!py
/**
 * @include getOffsetFromRectByPoint
 */
function getOffsetFromNodeByPoint(node, p, usePercent)
	const rect = node.getBoundingClientRect()
	return getOffsetFromRectByPoint(rect, p, usePercent)