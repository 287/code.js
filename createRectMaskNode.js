//#!py
function createRectMaskNode(rect, offset)
	const node = document.createElement('span')
	node.setAttribute('rect-mask', '')
	
	const nodes = []
	
	for 4 as i
		nodes[i] = document.createElement('i')
		node.append(nodes[i])
		
	Object.assign(node, {
		nodes,
		setRect,
	})
	
	if rect
		setRect(rect)
	
	return node
	
	function setRect(targetRect, offset = 10)
		const rect = {}
		/**
		 * @include ltKeys sizeKeys
		 */
		for ltKeys as key, i
			rect[key] = targetRect[key] - offset
			
		for sizeKeys as key, i
			rect[key] = targetRect[key] + offset * 2
			
		nodes[0].style.cssText = `height: ${rect.top}px;`
		nodes[1].style.cssText = `top: ${rect.top + rect.height}px;`
		nodes[2].style.cssText = `width: ${rect.left}px; height: ${rect.height}px; top: ${rect.top}px;`
		nodes[3].style.cssText = `left: ${rect.left + rect.width}px; height: ${rect.height}px; top: ${rect.top}px;`