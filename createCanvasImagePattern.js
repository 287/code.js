//#!py
/**
 * @include createCanvasContext resetImageSize2canvas
 * @param {image} img
 * @param {string} [repeatType = 'repeat']
 * @param {array<number>} [imgSize]
 * @return {canvasGradient}
 */
function createCanvasImagePattern(img, repeatType = 'repeat', imgSize)
	const ctx = createCanvasContext()
	if imgSize
		img = resetImageSize2canvas(img, imgSize)
	img = ctx.createPattern(img, repeatType)
	return img