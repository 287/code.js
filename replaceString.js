//#!py
/**
 * @desc 替换字符串中所有的字符串
 * @include findIndexsFromString replaceStringByMatchs
 * @param {string} string
 * @param {string} findStr
 * @param {string} replaceStr
 * @return {string}
 */
function replaceString(string, findStr, replaceStr)
	const matchs = findIndexsFromString(string, findStr).map(index=> {
		return {
			index,
			0: findStr,
		}
	})
	
	return replaceStringByMatchs(string, matchs, replaceStr)