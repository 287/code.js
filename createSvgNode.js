//#!py
/**
 * @param {string} tagName
 * @return {element}
 */
function createSvgNode(tagName)
	const ns = 'http://www.w3.org/2000/svg'
	const node = document.createElementNS(ns, tagName)
	if tagName === 'svg'
		node.setAttribute('xmlns', ns)
	return node