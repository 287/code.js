//#!py
/**
 * @desc 替换字符串中所有的字符串
 * @include findIndexsFromString replaceStringByMatchs
 * @param {string} string
 * @param {string} findStr
 * @param {string|function} replaceStr
 * @return {string}
 */
function replaceStringKeyword(string, findStr, replaceStr)
	const matchs = findIndexsFromString(string, findStr).map(index=> {
		return {
			index,
			0: findStr,
		}
	})
	
	for matchs as match i
		if /\w|[\u4e00-\u9fa5]/.test(string.charAt(match.index - 1)) || /\w|[\u4e00-\u9fa5]/.test(string.charAt(match.index + findStr.length))
			matchs.splice(i--, 1)
	
	if matchs.length === 0
		return string
		
	return replaceStringByMatchs(string, matchs, replaceStr)