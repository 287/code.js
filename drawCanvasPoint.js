/**
 * @param {canvascontext} ctx
 * @param {object} op
 * @param {number} op.x
 * @param {number} op.y
 * @param {number} op.r
 * @return {undefined}
 */
function drawCanvasPoint(ctx, op){
	ctx.arc(op.x, op.y, op.r, 0, 2 * Math.PI);
}