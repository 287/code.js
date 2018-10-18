//#!py
/**
 * @include isStringStartsWith isStringEndsWith
 * @param {string} str
 * @param {string} [start]
 * @param {string} [end]
 * @return {boolean}
 */
function isStringWith(str, start, end)
	if start != null
		if !isStringStartsWith(str, start)
			return false
			
	if end != null
		if !isStringEndsWith(str, end)
			return false
			
	return true