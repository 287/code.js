//#!py
/**
 * @include isString eachObject getAnimationFrameByPercent setNodeStyle isEmptyObject getEasingRatio
 * @param {array<object>} frames
 * @param {number} percent - 小数
 * @return {object}
 */
function animateNodeStyle(node, style, duration = 300, cb)
	const sourceStyle = {}
	const targetStyle = {}
	const subfixs = {}
	
	eachObject(style, (value, key)=> {
		targetStyle[key] = parseValue(key, value)
		sourceStyle[key] = parseValue(key, node.style[key])
	})
		
	const time = Date.now()
	const needSetSubfix = !isEmptyObject(subfixs)
	
	return animate()
	
	function animate()
		return requestAnimationFrame(()=> {
			const percent = getEasingRatio(Math.min((Date.now() - time) / duration, 1))
			let style = getAnimationFrameByPercent(sourceStyle,  targetStyle, percent)
			if needSetSubfix
				eachObject(subfixs, (value, key)=> {
					style[key] += value
				})
			setNodeStyle(node, style)
			
			if percent < 1
				animate()
			else
				if cb
					cb()
		})
	
	function parseValue(key, value)
		if isString(value)
			let lastValue = value
			value = parseFloat(value)
			if isNaN(value)
				value = 0
			
			let subfix = lastValue.slice(value.toString().length)
			if subfix.length && subfix != 'px'
				subfixs[key] = subfix
		return value