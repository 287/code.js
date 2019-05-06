//#!py
/**
 * @param {string} src
 * @param {function} cb
 * @return {<element>}
 */
function loadImage(src, cb)
	const img = new Image
	img.src = src
	img.onload = ()=> cb(null, img)
	img.onerror = cb
	return img