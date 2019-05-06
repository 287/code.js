//#!py
/**
 * @include sizeKeys 
 * @include toCapitalize createCanvas eachArrayMapObject
 * @param {element} img
 * @param {string} type
 * @return {canvaselement}
 */
function img2canvas(img, size)
	if !size
		size = sizeKeys.map(key=> img[key] || img[`natural${toCapitalize(key)}`])
		
	const rect = {}
	sizeKeys.forEach((key, i)=> rect[key] = size[i])
	
	const canvas = createCanvas(rect)
	const ctx = canvas.getContext('2d')
	ctx.drawImage(img, 0, 0, ...size)
	
	return canvas