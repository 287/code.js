/**
 * @param {string} str
 * @param {string} withStr
 * @return {boolean}
 */
function isStringStartsWith(str, withStr){
	return str.slice(0, withStr.length) === withStr;
}