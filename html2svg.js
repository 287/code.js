//#!py
/**
 * @include rectKeys sizeKeys ltKeys
 * @include createSvg createSvgNode toCapitalize
 * @param {element} svg
 * @return {svgelement}
 */
function html2svg(...nodes)
	const node = nodes[0]
	const style = {}
	rectKeys.forEach(key=> style[key] = parseInt(node.style[key]) || node[`client${toCapitalize(key)}`])
	sizeKeys.forEach((key, i)=> style[key] += style[ltKeys[i]])
	
	const svg = createSvg(style)
	const foreign = createSvgNode('foreignObject')
	// const body = document.createElement('body')
	svg.append(foreign)
	
	svg.style.imageRendering = 'pixelated'
	// foreign.append(body)
	
	// body.setAttribute('xmlns', "http://www.w3.org/1999/xhtml")
	// body.style.margin = 0
	sizeKeys.forEach((key)=> {
		foreign.setAttribute(key, '100%')
		// body.style[key] = style[key] + 'px'
	})
	
	// node = node.cloneNode(true)
	// const styleNode = document.createElement('style')
	// styleNode.innerHTML = `*{overflow: hidden}`
	// foreign.append(styleNode)
	// foreign.append(node)
	const newNodes = nodes.map(node=> {
		const newNode = node.cloneNode(true)
		
		const [canvases, placeholders] = [node, newNode].map(node=> node.querySelectorAll('canvas'));
		for canvases as canvas i
			const img = document.createElement('img')
			img.src = canvas.toDataURL('image/png', 1)
			sizeKeys.forEach(key=> img[key] = canvas[key])
			placeholders[i].replaceWith(img)
			// document.body.append(img.cloneNode(true))
			
		return newNode
	})
	
	newNodes.forEach(node=> foreign.append(node))
	
	return svg
	