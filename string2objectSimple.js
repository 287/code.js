//#!py
/**
 * @desc 将字符串拆分成键值对象
 * @include splitOnce
 * @param {string} str
 * @param {array<string>} seps
 * @return {object}
 */
function string2objectSimple(string, seps)
	const o = {}
	
	string.split(seps[1]).forEach((item)=>{
		if item === ''
			return
		
		let [key, value] = splitOnce(item, seps[0])
		
		o[key] = value
	})
	
	return o