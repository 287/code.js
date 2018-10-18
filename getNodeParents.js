//#!py
function getNodeParents(node)
	const list = []
	while node.parentNode && node.parentNode.nodeType === 1
		node = node.parentNode
		list.push(node)
	return list