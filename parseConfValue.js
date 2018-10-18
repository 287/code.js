//#!py
/**
 * @include isNumberLike isStringWith
 * @param {string} value
 */
function parseConfValue(value)
	var map = {
		null: null,
		undefined: undefined,
		true: true,
		on: true,
		false: false,
		off: false,
	}
	if value in map
		value = map[value]
	else if isNumberLike(value)
		value *= 1
	else if isStringWith(value, '[', ']') || isStringWith(value, '{', '}')
		value = Function('return (' + value + ')')()
	
	return value