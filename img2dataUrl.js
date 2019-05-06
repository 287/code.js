//#!py
/**
 * @include img2canvas
 * @param {imgelement} img
 * @param {string} [type = 'png']
 * @param {number} [quality = 1]
 * @return {canvaselement}
 */
function img2dataUrl(img, type, quality = 1)
	const canvas = img2canvas(img)
	return canvas.toDataURL(type, quality)