/**
 * @param {canvasContext2D} ctx
 * @param {number} type
 * @param {string} type
 * @param {array<number>} position - length must be 4 or 6
 * @param {array<array<percent, color>>} colorList
 * @return {canvasGradient}
 */
function setCanvasShadow(ctx, x = 0, y = 0, blur = 15, color){
	ctx.shadowOffsetX = x;
	ctx.shadowOffsetY = y;
	ctx.shadowBlur = blur;
	ctx.shadowColor = color;
	return ctx;
}