//#!py
/**
 * @include createSvgNode setNodeAttrs
 * @param {object} [op]
 * @param {number} [op.width = '100%']
 * @param {number} [op.height = '100%']
 * @return {element}
 */
function createSvg(op = {})
	const node = createSvgNode('svg')
	
	setNodeAttrs(node, {
		width: op.width || '100%',
		height: op.height || '100%',
		fill: 'transparent',
		stroke: 'transparent',
		transform: 'translate(.5, .5)',
	})
	
	return node