//#!py
/**
 * @desc 从字符串中读取首行字符串
 * @param {string} str
 * @param {string} [ln = '\n']
 * @return {string}
 */
function getFirstLine(str, ln = '\n')
	let i = str.indexOf(ln)
	i = i > -1 ? i : undefined
	return str.slice(0, i)
	