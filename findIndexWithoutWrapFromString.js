//#!py
/**
 * 获取字符串中下一个指定字符串的索引，规避()[]""''``等字符的包裹
 * @include findWrapFromString stringBlockWraps
 * @param {string} str
 * @param {string} chrs
 * @param {number} [start = 0]
 * @param {array<array<string, string>>} [wraps]
 * @return {number}
 */
function findIndexWithoutWrapFromString(string, str, startsIndex, endsIndex, wraps = stringBlockWraps)
	let index = -1
	
	findWrapFromString(string, wraps, (type, chr, i)=> {
		if type === 'char'
			if chr === str[0]
				if string.slice(i, i + str.length) === str
					index = i
					return false
		
	}, startsIndex, endsIndex)
	
	return index