//#!py
/**
 * 获取字符串中下一个指定字符串的索引，规避()[]""''等字符的包裹
 * @include findChrIndexWithoutWrapInString
 * @param {string} str
 * @param {string} chrs
 * @param {number} [start = 0]
 * @return {number}
 */
function findIndexWithoutWrapInString(string, str, start = 0){
	if str.length === 1
		return findChrIndexWithoutWrapInString(string, str, start)
	else
		let index = -1
		let i = start
		while i !== -1
			i = findChrIndexWithoutWrapInString(string, str[0] || '', i)
			if i > -1
				if string.slice(i, i + str.length) === str
					index = i
					break
				else
					i++
					
		return index