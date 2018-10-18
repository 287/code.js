//#!py
/**
 * @include createSvgNode setSvgNodeStyle
 * @param {image} img
 * @param {string} [repeatType = 'repeat']
 * @param {array<number>} [imgSize]
 * @return {canvasGradient}
 */
function createSvgImagePattern(img, imgSize)
	const pattern = createSvgNode('pattern')
	const image = createSvgNode('image')
	
	pattern.appendChild(image)
	
	if !imgSize
		imgSize = [img.naturalWidth, img.naturalHeight]
		
	setSvgNodeStyle(image, {
		left: 0,
		top: 0,
		width: imgSize[0],
		height: imgSize[1],
		href: img.src,
	})
	
	setSvgNodeStyle(pattern, {
		left: 0,
		top: 0,
		width: imgSize[0],
		height: imgSize[1],
		patternUnits: 'userSpaceOnUse',
		id: `svg-pattern-${img.src}`,
	})
	
	return pattern