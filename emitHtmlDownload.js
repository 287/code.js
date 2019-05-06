//#!py
/**
 * @include html2svg emitSvgDownload
 * @param {element} node
 * @param {string} key
 * @return {undefined}
 */
function emitHtmlDownload(node, type = 'png', name = 'html')
	const svg = html2svg(node)
	
	emitSvgDownload(svg, type, name)