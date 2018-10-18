//#!py
/**
 * @param {string} tagName
 * @return {element}
 */
function createSvgNode(tagName = 'svg')
	const ns = 'http://www.w3.org/2000/svg'
	const node = document.createElementNS(ns, tagName)
	if tagName === 'svg'
		node.setAttribute('xmlns', ns)
		// node.setAttribute('fill', 'transparent')
		// node.setAttribute('stroke', 'transparent')
	return node