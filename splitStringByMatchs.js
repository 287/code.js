//#!py
/**
 * @desc 用matchs拆分string
 * @param {string} string
 * @param {array<object>} matchs - basic format of matchs [{index: number, 0: string}]
 * @return {array<string>}
 */
function splitStringByMatchs(string, matchs)
	const strs = []
	let offset = 0
	matchs.forEach((match, i)=> {
		strs.push(string.slice(offset, match.index))
		offset = match.index + match[0].length
	})
	
	strs.push(string.slice(offset))
	
	return strs