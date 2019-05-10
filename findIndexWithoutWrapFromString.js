//#!py
/**
 * 获取字符串中下一个指定字符串的索引，规避()[]""''``等字符的包裹
 * @include findWrapFromString
 * @param {string} str
 * @param {string} chrs
 * @param {number} [start = 0]
 * @param {array<array<string, string>>} [wraps]
 * @return {number}
 */
function findIndexWithoutWrapFromString(string, str, start = 0, wraps)
	wraps = wraps || [
		// '{}',
		// '[]',
		// '()',
		'""',
		"''",
		'``',
		['/*', '*/'],
	]
	
	let index = -1
	
	findWrapFromString(string, wraps, start, (type, chr, i)=> {
		if type === 'char'
			if chr === str[0]
				if string.slice(i, i + str.length) === str
					index = i
					return false
		
	})
	
	return index
	
	
// const arr = [
	// "a /* b */ <!-- b --> 'b' `b` b",
	// "b",
// ]
// console.log(arr)
// const i = findIndexWithoutWrapFromString(...arr)
// console.log(arr[0].slice(i, i + 4))