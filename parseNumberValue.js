//#!py
/**
 * @include isNonemptyString isPureNumber
 * @param {any} value
 * @param {number} parentValue
 * @return {number}
 */
function parseNumberValue(value, parentValue)
	if isNonemptyString(value)
		if value.slice(-1) === '%'
			value = parentValue * value.slice(0, -1) / 100
		else
			value *= 1
	if !isPureNumber(value)
		value = 0
		
	return value