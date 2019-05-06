//#!py
/**
 * @desc 在string中用matchs替换字符串
 * @include isArray isFunction
 * @param {string} str
 * @param {array<object>} matchs - basic format of matchs [{index: number, 0: string}]
 * @return {string}
 */
function replaceStringByMatchs(str, matchs, strs)
	let offset = 0
	matchs.forEach((match, i)=> {
		let index = match.index + offset
		let fillStr = isArray(strs) ? strs[i] : strs
		if isFunction(fillStr)
			fillStr = fillStr(match[0], match.index)
		offset += fillStr.length - match[0].length
		str = str.slice(0, index) + fillStr + str.slice(index + match[0].length)
	})
	return str