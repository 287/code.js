//#!py
/**
 * 替换掉字符串中以单或双引号包裹起来的部分
 * @include findWrapFromString
 * @param {string} str
 * @return {array<string,array<string>>}
 * @return {array<string,array<string>>}
 */
function replaceStringToMark(string, wraps)
	wraps = wraps || [
		'""',
		"''",
		'``',
	]
	
	const ranges = []
	
	findWrapFromString(string, wraps, 0, (type, str, i)=> {
		select type
			case 'start'
				ranges.push([i])
				
			case 'end'
				ranges[ranges.length - 1][1] = i + str.length
	})
	
	const matchs = ranges.map(indexs=> string.slice(...indexs))