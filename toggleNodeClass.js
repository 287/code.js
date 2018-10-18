//#!py
/**
 * @include getNodeClass
 * @return {boolean}
 */
function toggleNodeClass(node, className)
	const classNames = getNodeClass(node)
	const index = classNames.indexOf(className)
	let rs
	if index > -1
		classNames.splice(index, 1)
		rs = false
	else
		classNames.push(className)
		rs = true
	node.className = classNames.join(' ')
	return rs