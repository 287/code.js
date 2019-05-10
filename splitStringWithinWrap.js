//#!py
/**
 * 拆分字符串，规避()[]""''等字符的包裹
 * @include findIndexWithoutWrapFromString
 * @param {string} str
 * @param {string} sep
 * @param {number} times - 限制拆分次数
 * @return {array<string>}
 */
function splitStringWithinWrap(string, sep, times = 0)
	let arr = []
	let lastIndex = 0
	let index
	while (index = findIndexWithoutWrapFromString(string, sep, lastIndex)) !== -1
		arr.push(string.slice(lastIndex, index))
		lastIndex = index + sep.length
		if times && arr.length >= times 
			break
		
	arr.push(string.slice(lastIndex))
	
	return arr