/**
 * @desc 把当前画布上的点转换成未缩放平移的点
 * @include getSvgSize getSvgViewBox getSvgScaleFromViewBox
 * @param {svgelement} svg
 * @param {array<number>} p
 * @param {array<number>} [size]
 * @param {array<number>} [viewBox]
 * @return {array<number>}
 */
function toSvgOriginPoint(svg, p, size, viewBox){
	size = size || getSvgSize(svg);
	viewBox = viewBox || getSvgViewBox(svg, size);
	let ratio = getSvgScaleFromViewBox(svg, size, viewBox);
	return p.map((v, i)=> (v + viewBox[i] * ratio[i]) / ratio[i]);
}