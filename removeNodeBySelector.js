//#!py
function removeNodeBySelector(s)
	const node = document.querySelector(s)
	if node
		node.parentNode.removeChild(node)
		return node