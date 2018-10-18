//#!py
/**
 * @include sizeKeys ltKeys
 * @param {object} rect
 * @param {array} wrapSize
 * @return {object}
 */
function generateZoomAndTranslateToFitRectWithinSize(rect, wrapSize)
	const ratios = wrapSize.map((v, i)=> v / rect[sizeKeys[i]])
	const zoom = Math.min(...ratios)	
	const translate = wrapSize.map((v, i)=> (v / zoom - rect[sizeKeys[i]]) / 2 - rect[ltKeys[i]])

	return {
		zoom,
		translate,
	}