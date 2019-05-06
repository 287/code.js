//#!py
/**
 * @include emptyNode isString
 */
function setNodeChild(parent, ...nodes)
	emptyNode(parent)
	
	for nodes as node -
		if node == null
			continue
		if isString(node)
			parent.innerHTML = node
		else
			parent.appendChild(node)