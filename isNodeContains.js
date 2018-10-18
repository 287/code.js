//#!py
function isNodeContains(pNode, node)
	while node.parentNode && node.parentNode.nodeType === 1
		if node.parentNode === pNode
			return true
		else
			node = node.parentNode
	return false