//#!py
/**
 * @param {element} node
 * @param {string} key
 * @param {boolean|string} value
 * @return {undefined}
 */
function setNodeAttr(node, key, value)
	if value === false
		node.removeAttribute(key)
	else
		if value === true || value == null
			value = ''
		node.setAttribute(key, value)