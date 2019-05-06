//#!py
/**
 * @desc 是否是接受输入的节点
 * @include isInputNode
 */
function isInputableNode(node)
	return isInputNode(node) && (!node.disabled && !node.readonly) || node.isContentEditable