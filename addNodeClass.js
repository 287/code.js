//#!py
/**
 * @include getNodeClass
 * @return {boolean}
 */
function addNodeClass(node, className)
	const classNames = getNodeClass(node)
	const index = classNames.indexOf(className)
	if index === -1
		classNames.push(className)
		node.className = classNames.join(' ')
		return true