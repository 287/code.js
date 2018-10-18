//#!py
/**
 * @include isString isArray createSvgGradient
 */
function toSvgPaintStyle(value)
	if isString(value)
		if value === ''
			value = 'transparent'
	else if isArray(value)
		value = createSvgGradient(...value)
	else
		value = null
	return value