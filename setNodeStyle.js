//#!py
/**
 * @include eachObjectNative setNodeStyleValue
 * @param {element} node
 * @param {object} style
 */
function setNodeStyle(node, style, value)
	eachObjectNative(style, (value, key)=> setNodeStyleValue(node, key, value))