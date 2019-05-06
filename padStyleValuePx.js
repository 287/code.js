//#!py
/**
 * @desc 给需要style的value增加px
 * @include isBoolean
 * @param {string} key
 * @param {string|number} value
 * @return {string}
 */
function padStyleValuePx(key, value)
	value = value.toString()
	const notPadKeys = ['tab-size', 'opacity', 'zoom', 'z-index', 'scale']
	if !notPadKeys.includes(key)
		value = value.replace(/[\d\.]+/g, (num, index)=> {
			let padpx = true
			
			if num == 0
					|| /\w|#/.test(value.charAt(index - 1))
					|| /\w|%/.test(value.charAt(index + num.length))
					|| /(rgb|hsl)a?\([\d%\s,\.]*$/.test(value.slice(0, index))
				padpx = false
				
			if padpx
				num += 'px'
				
			return num
		})
	
	return value