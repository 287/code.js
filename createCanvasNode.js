/**
 * @param {object} op
 * @param {number} op.width
 * @param {number} op.height
 * @param {number} [op.dpr = 1]
 * @return {canvaselement}
 */
function createCanvasNode(op){
	const canvas = document.createElement('canvas');
	op = Object.assign({
		width: 0,
		height: 0,
		dpr: 1,
	}, op);
	canvas.width = op.width * op.dpr;
	canvas.height = op.height * op.dpr;
	canvas.dpr = op.dpr;
	if(op.dpr !== 1){
		canvas.style.width = op.width + 'px';
		canvas.style.height = op.height + 'px';
	}
	return canvas;
}