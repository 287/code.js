//#!py
/**
 * @include sizeKeys 
 * @include createSvg createSvgNode toCapitalize svg2img
 * @param {svgelement} svg
 * @param {string} type
 * @return {imgelement}
 */
function html2img(node, cb)
	const size = {}
	sizeKeys.forEach(key=> size[key] = parseInt(node.style[key]) || node[`client${toCapitalize(key)}`])
	
	const svg = createSvg(size)
	const foreign = createSvgNode('foreignObject')
	eachObject(size, (value, key)=> foreign.setAttribute(key, value))
	svg.append(foreign)
	node = node.cloneNode(true)
	node.setAttribute('xmlns', "http://www.w3.org/1999/xhtml")
	foreign.append(node)
	// document.body.append(svg)
	
	return svg2img(svg, cb)
	