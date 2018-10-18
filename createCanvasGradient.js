//#!py
/**
 * @include createCanvasContext
 * @param {array<number>} position - length must be 4 || 5 || 6
 * @param {array<array<percent, color>>} colorList
 * @return {canvasGradient}
 */
function createCanvasGradient(position, colorList)
	const ctx = createCanvasContext()
	const type = position.length > 4 ? 'createRadialGradient' : 'createLinearGradient'
	const gradient = ctx[type](...position)
	colorList.forEach((v)=> gradient.addColorStop(...v))
	return gradient