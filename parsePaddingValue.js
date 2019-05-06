//#!py
/**
 * @include isString trim isArray fillArrayValue
 * @param {array<number>|number} value
 * @return {array<number>}
 */
function parsePaddingValue(value)
	if isString(value)
		value = trim(value).split(/\s+/).map(v=> +v)
		
	if isArray(value)
		select value.length
			case 1
				value = fillArrayValue([], value[0], 0, 4)
				
			case 2
				value = value.slice(0)
				value.push(...value)
				
			case 3
				value = value.slice(0)
				value.push(value[1])
	else
		value = fillArrayValue([], value, 0, 4)
	
	return value