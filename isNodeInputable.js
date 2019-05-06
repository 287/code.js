//#!py
/**
 * @desc 节点是否可以输入
 * @include isInputableNode
 */
function isNodeInputable(node)
	if document.activeElement === node
		if isInputableNode(node)
				return true
			
	return false