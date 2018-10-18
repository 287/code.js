//#!py
/**
 * @include createSvgNode
 * @param {string} src
 * @param {function} cb
 * @return {<element>}
 */
function loadSvgImage(src, cb)
	const img = createSvgNode('image')
	// img.setAttribute('xlink:href', src)
	img.setAttribute('href', src)
	img.onload = ()=> cb(null, img)
	img.onerror = (e)=> cb(e)