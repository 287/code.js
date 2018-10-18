//#!py
/**
 * @include createSvgNode
 * @param {object} [op]
 * @param {number} [op.width = '100%']
 * @param {number} [op.height = '100%']
 * @return {element}
 */
function createSvg(op = {})
	const node = createSvgNode()
	node.setAttribute('width', op.width || '100%')
	node.setAttribute('height', op.height || '100%')
	
	return node