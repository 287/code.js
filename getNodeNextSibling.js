//#!py
function getNodeNextSibling(node, nodeType = 1)
	while node = node.nextSibling
		if !nodeType || node.nodeType === nodeType
			break
			
	return node