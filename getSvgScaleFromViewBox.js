/**
 * @desc 从当前画布的viewBox获取缩放系数
 * @include getSvgSize getSvgViewBox
 * @param {svgelement} svg
 * @param {array<number>} [size]
 * @param {array<number>} [viewBox]
 * @return {array<number>}
 */
function getSvgScaleFromViewBox(svg, size, viewBox){
	size = size || getSvgSize(svg);
	viewBox = viewBox || getSvgViewBox(svg, size);
	let ratio = [];
	for(let i = 0; i < 2; i++){
		ratio[i] = size[i] / viewBox[i + 2];
	}
	return ratio;
}