//#!py
/**
 * @include getColorTypeFromString getColorArrayFromString joinColorArray hslArray2rgbArray rgbArray2hslArray
 */
function parseColorString(str, type)
	if type
		const colorType = getColorTypeFromString(str)
		if colorType !== type
			const arr = getColorArrayFromString(str, type)
			str = joinColorArray(arr, type)
	
	return str