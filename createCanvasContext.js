//#!py
/**
 * @desc 创建一个空白的 CanvasRenderingContext2D
 * @param {string} [type = '2d']
 * @return {canvasContext2D}
 */
function createCanvasContext(type = '2d')
	if !createCanvasContext.ctx
		const canvas = document.createElement('canvas')
		createCanvasContext.ctx = canvas.getContext(type)
	return createCanvasContext.ctx
	