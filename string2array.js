//#!py
/**
 * @desc 将字符串拆分成数组；拆分无限层；可以规避()[]""''等字符的包裹
 * @include isArray eachArray trim splitStringWithoutWrap
 * @param {string} str
 * @param {string|array<string>} seps
 * @return {array<string|array>}
 */
function string2array(string, seps, op = {trimValue: false, trimQuote: true, removeBlankValue: true})
	seps = isArray(seps) ? seps : [seps]
	
	function split(string, level)
		let sep = seps[level]
		let arr = splitStringWithoutWrap(string, sep)
		let hasNext = seps.length > level + 1
		for arr as value i
			if op.trimValue
				value = trim(value)
			if op.removeBlankValue && value === ''
				arr.splice(i, 1)
				i--
				continue
				
			if op.trimQuote
				if value[0] === '"' && value.slice(-1) === '"'
					value = value.slice(1, -1)
			
			if hasNext
				value = split(value, level + 1)
				
			arr[i] = value
		
		return arr
	
	return split(string, 0)