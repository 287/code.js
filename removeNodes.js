//#!py
/**
 * @include isArray removeNode
 */
function removeNodes(nodes)
	if !isArray(nodes)
		nodes = Array.from(nodes)
	nodes.forEach(node=> removeNode(node))