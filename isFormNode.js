//#!py
/**
 * @include isInputNode
 */
function isFormNode(node)
	return isInputNode(node) || ['select', 'button'].includes(node.tagName.toLowerCase())