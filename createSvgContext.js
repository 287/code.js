//#!py
/**
 * @desc 创建一个空白的 svgContext
 * @include createSvgNode
 * @param {string} [type = '2d']
 * @return {canvasContext2D}
 */
function createSvgContext()
	if !createSvgContext.ctx
		const svg = createSvgNode()
		const defs = createSvgNode('defs')
		svg.appendChild(defs)
		createSvgContext.ctx = defs
		// createSvgContext.ctx = createSvg({
			// width: 0,
			// height: 0,
		// })
	return createSvgContext.ctx
	