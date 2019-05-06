//#!py
/**
 * @include transformKeys
 * @include isBoolean isNumber padStyleValuePx
 * @param {element} node
 * @param {string} key
 * @param {*} value
 */
function setNodeStyleValue(node, key, value)
	select key
		case 'bold'
			value = value ? key : 'normal'
			key = 'fontWeight'
		case 'italic'
			value = value ? key : 'normal'
			key = 'fontStyle'
		case 'display'
			if value == null
				value = true
			if isBoolean(value)
				value = value ? 'block' : 'none'
		case 'rotate'
			if !/[a-z]$/i.test(value)
				value += 'deg'
		case 'align'
			key = 'textAlign'
				
	if value == null || value === false
		value = ''
				
	value = padStyleValuePx(key, value)
	
	if transformKeys.includes(key)
		const transforms = node.style.transforms = node.style.transforms || {}
		transforms[key] = value
		
		const values = []
		for transforms as value, key, i
			if value
				values.push(`${key}(${value})`)
				
		key = 'transform'
		value = values.join(' ')
		
	node.style[key] = value