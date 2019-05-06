//#!py
function getNodePrevSiblings(node, nodeType = 1)
	const nodes = []
	while node = node.previousSibling
		if nodeType && node.nodeType !== nodeType
			continue
		nodes.push(node)
			
	return nodes