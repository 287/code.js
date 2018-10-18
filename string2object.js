//#!py
/**
 * @desc 将字符串拆分成键值对象；拆分一层；可以规避()[]""''等字符的包裹
 * @include splitStringWithoutWrap trim
 * @param {string} str
 * @param {array<string>} seps
 * @return {array<string|array>}
 */
function string2object(string, seps, op = {trimKey: true, trimValue: false, removeBlankKey: false})
	const o = {}
	
	splitStringWithoutWrap(string, seps[1]).forEach((item)=>{
		if item === ''
			return
			
		let [key, value = ''] = splitStringWithoutWrap(item, seps[0], 1)
		// if value === undefined
			// return
		if op.trimKey
			key = trim(key)
		if op.trimValue
			value = trim(value)
		if op.removeBlankKey
			if key === ''
				return
				
		o[key] = value
	})
	
	return o