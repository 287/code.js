//#!py
/**
 * @desc 
 * @include createNodeByCpt insertNodeBefore removeNode
 * @return {undefined}
 */
function applyCptNode()
	for document.querySelectorAll('script[type="cpt"]:not([name])') as scriptNode -
		const node = createNodeByCpt(scriptNode.innerHTML)
		if node
			insertNodeBefore(node, scriptNode)
			if node.styleNode
				document.head.append(node.styleNode)
		removeNode(scriptNode)