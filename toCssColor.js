//#!py
/**
 * @include toCssGradient
 */
function toCssColor(value)
	if value && value.startsWith('[')
		value = toCssGradient(...JSON.parse(value))
	return value