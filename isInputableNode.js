//#!py
/**
 * @include isFormNode
 */
function isInputableNode(node)
	if isFormNode(node)
		let tagName = node.tagName.toLowerCase()
		if tagName === 'textarea' || (tagName === 'input' && !['checkbox', 'radio', 'range'].includes(node.type))
			if !node.disabled && !node.readonly
				return true
	return false