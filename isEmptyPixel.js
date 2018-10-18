/**
 * 判断是否是空的像素点
 * @param {array<number>} pixel - [r, g, b, a]
 * @return {boolean}
 */
function isEmptyPixel(pixel){
	return pixel[0] === 0 && pixel[1] === 0 && pixel[2] === 0 && pixel[3] === 0;
}