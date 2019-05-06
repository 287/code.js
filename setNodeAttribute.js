//#!py
/**
 * @include toSnakeCase
 * @param {element} node
 * @param {string} key
 * @param {boolean|string} value
 * @return {undefined}
 */
function setNodeAttribute(node, key, value)
	if !node[key]
		key = toSnakeCase(key, '-')
	
	if value === false
		node.removeAttribute(key)
	else
		if value === true || value == null
			value = ''
		node.setAttribute(key, value)