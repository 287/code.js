//#!py
/**
 * @include eachArray removeNode
 */
function emptyNode(node)
	while node.childNodes.length
		removeNode(node.childNodes[0])