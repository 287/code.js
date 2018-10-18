//#!py
/**
 * @include getNodeClass
 * @return {boolean}
 */
function removeNodeClass(node, className)
	const classNames = getNodeClass(node)
	const index = classNames.indexOf(className)
	if index > -1
		classNames.splice(index, 1)
		node.className = classNames.join(' ')
		return true