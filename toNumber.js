//#!py
/**
 * @include isPureNumber
 */
function toNumber(value, ifNonNumberValue = 0)
	value *= 1
	if !isPureNumber(value)
		value = ifNonNumberValue
	return value