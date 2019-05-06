//#!py
/**
 * @include setNodeAttrs
 * @return {element}
 */
function createSvgClipUse(useid, target, type)
	type = type || 'clip'
	const tagName = type === 'clip' ? type + 'Path' : type
	
	const node = createSvgNode(tagName)
	const useNode = createSvgNode('use')
	node.appendChild(useNode)
	setNodeAttrs(node, {
		id: `${type}-${useid}`,
		// clipPathUnits: `userSpaceOnUse`,
	})
	setNodeAttrs(useNode, {
		href: `#${useid}`,
	})
	
	if target
		const clipPath = createSvgClipUse(useid + '-target')
		target.appendChild(node)
		target[type + 'by'] = node
		target[type + 'Use'] = useNode
	
	return node