//#!py
/**
 * @include isString serializeNode
 * @param {svgelement} svg
 * @return {string}
 */
function svg2dataUrl(svg)
	const xml = isString(svg) ? svg : serializeNode(svg)
    const xmlHead = '<?xml version="1.0" standalone="no"?>'
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xmlHead + xml)}`
    return dataUrl