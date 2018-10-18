//#!py
/**
 * @include splitColorString hslArray2rgbArray rgbArray2hslArray
 */
function getColorArrayFromString(str, type, withOpacity)
	let [colorType, arr] = splitColorString(str, withOpacity)
	if type
		if type !== colorType
			if colorType === 'hsl'
				arr = hslArray2rgbArray(arr)
			else if type === 'hsl'
				arr = rgbArray2hslArray(arr)
				
	return arr