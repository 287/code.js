//#!py
/**
 * @include isString isArray createCanvasGradient
 */
function toCanvasPaintStyle(value)
	if isString(value)
		if value === ''
			value = 'transparent'
	else if isArray(value)
		value = createCanvasGradient(...value)
	else
		value = null
	return value