//#!py
function isFormNode(node)
	return ['input', 'textarea', 'select', 'button'].includes(node.tagName.toLowerCase())