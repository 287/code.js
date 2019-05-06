//#!py
/**
 * @include isPureNumber
 */
function parseToNumber(num, defaultValue = 0)
	if num == null || num === ''
		num = defaultValue
	else
		num *= 1
		
		if !isPureNumber(num)
			num = defaultValue
		
	return num