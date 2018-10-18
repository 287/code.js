//#!py
/**
 * @include isInputableNode
 */
function isInputable()
	const node = document.activeElement
	return node && isInputableNode(node)