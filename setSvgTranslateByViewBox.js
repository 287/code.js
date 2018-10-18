/**
 * @include getSvgViewBox getSvgScaleFromViewBox
 * @param {svgelement} svg
 * @param {array<number>|number} [offset = [0, 0]]
 * @return {undefined}
 */
function setSvgTranslateByViewBox(svg, offset = [0, 0]){
	offset = toArrayIfNot(offset, 2);
	
	let viewBox = getSvgViewBox(svg);
	let ratio = getSvgScaleFromViewBox(svg, null, viewBox);
	
	offset.forEach((v, i)=> viewBox[i] = viewBox[i] - v * ratio[i]);
	
	svg.setAttribute('viewBox', viewBox.join(' '))
}