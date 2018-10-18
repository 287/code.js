//#!py
/**
 * @include emptyNode
 */
function setNodeChild(parent, ...nodes)
	emptyNode(parent)
	nodes.forEach(node=> parent.appendChild(node))