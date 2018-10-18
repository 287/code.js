//#!py
/**
 * @include colorTypes colorKeyMap
 */
function getColorTypeFromString(str)
	let type = ''
	str = colorKeyMap[str] || str
	
	if str.charAt(0) === '#'
		type = 'hex'
	else
		type = str.slice(0, 3)
		if !colorTypes.includes(type)
			type = ''
	
	return type