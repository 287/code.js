//#!py
/**
 * @include createCanvas
 * @param {string} src
 * @param {function} cb
 * @return {<element>}
 */
function resetImageSize2canvas(img, width = img.naturalWidth, height = img.naturalHeight, dpr = 1)
	const canvas = createCanvas({
		width,
		height,
		dpr,
	})
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
	return canvas