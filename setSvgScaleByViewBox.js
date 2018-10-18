/**
 * @include toArrayIfNot getSvgSize toSvgOriginPoint
 * @param {svgelement} svg
 * @param {array<number>|number} [ratio = 1]
 * @param {array<number>} [p] - 缩放的基准点
 * @return {undefined}
 */
function setSvgScaleByViewBox(svg, ratio = 1, p = [0, 0]){
	ratio = toArrayIfNot(ratio, 2);
	let viewBox = []
	let size = getSvgSize(svg);
	
	for(let i = 0; i < 2; i++){
		viewBox[i + 2] = size[i] / ratio[i];
	}
	
	let pOri = toSvgOriginPoint(svg, p, size);
	let pCur = pOri.map((v, i)=> v * ratio[i]);
	
	for(let i = 0; i < 2; i++){
		viewBox[i] = (pCur[i] - p[i]) / ratio[i];
	}
	
	svg.setAttribute('viewBox', viewBox.join(' '))
}