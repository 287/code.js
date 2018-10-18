//#!py
/**
 * @include limitPonitInRect ltKeys sizeKeys
 */
function getOffsetFromRectByPoint(rect, p, usePercent)
	const offset = limitPonitInRect(p, rect).map((v, i)=> v - rect[ltKeys[i]])
	if usePercent
		sizeKeys.forEach((key, i)=> offset[i] /= rect[sizeKeys[i]])
	return offset