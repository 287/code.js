//#!py
function getNodePrevSibling(node, nodeType = 1)
	while node = node.prevSibling
		if !nodeType || node.nodeType === nodeType
			break
			
	return node