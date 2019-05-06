//#!py
function isInputNode(node)
	return ['INPUT', 'TEXTAREA'].includes(node.tagName) && !['checkbox', 'radio', 'range'].includes(node.type)