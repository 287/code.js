//#!py
/**
 * @include isFunction img2canvas
 * @param {imgelement} img
 * @param {object} [op]
 * @param {string} [op.type]
 * @param {number} [op.quality = 1]
 * @param {array<number>} [op.size]
 * @param {function} cb
 * @return {canvaselement}
 */
function img2blob(img, op, cb)
	if isFunction(op)
		cb = op
		op = null
		
	op = Object.assign({
		type: null,
		size: null,
		quality: 1,
	}, op)
	
	const canvas = img2canvas(img, op.size)
	canvas.toBlob((blob)=> cb(null, blob), op.type, op.quality)
	
	return canvas