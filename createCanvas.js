//#!py
/**
 * @include sizeKeys 
 * @param {object} op
 * @param {number} op.width
 * @param {number} op.height
 * @param {number} [op.dpr = 1]
 * @return {canvaselement}
 */
function createCanvas(op = {})
	const canvas = document.createElement('canvas')
	const dpr = op.dpr || 1
	
	sizeKeys.forEach(key=> {
		canvas[key] = op[key] * dpr
		if dpr !== 1
			canvas.style[key] = op[key] + 'px'
	})
	canvas.dpr = dpr
	
	return canvas