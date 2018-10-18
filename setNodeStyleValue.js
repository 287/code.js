//#!py
/**
 * @include isBoolean isNumber
 * @param {element} node
 * @param {string} key
 * @param {*} value
 */
function setNodeStyleValue(node, key, value)
	if key === 'bold'
		value = value ? key : 'normal'
		key = 'fontWeight'
	else if key === 'italic'
		value = value ? key : 'normal'
		key = 'fontStyle'
	
	else if key === 'display'
		if value == null
			value = true
		if isBoolean(value)
			value = value ? 'block' : 'none'
	
	else if isNumber(value)
		value += 'px'
	
	else if value == null
		value = ''
		
	node.style[key] = value