//#!py
/**
 * @param {string} str
 * @param {string} withStr
 * @return {boolean}
 */
function isStringEndsWith(str, withStr)
	if withStr === ''
		return true
	return str.slice(-withStr.length) === withStr