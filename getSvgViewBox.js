/**
 * @include getSvgSize
 * @param {svgelement} svg
 * @param {array<number>} [size]
 * @return {array<number>}
 */
function getSvgViewBox(svg, size){
	size = size || getSvgSize(svg);
	let viewBox = svg.getAttribute('viewBox');
	if(viewBox){
		viewBox = viewBox.split(' ').map(v=> v * 1);
	}else{
		viewBox = [0, 0].concat(size);
	}
	return viewBox;
}