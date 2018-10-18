//#!py
/**
 * @include isNumber isArray createSvgNode toPercentCase getPointOnRectByAngle
 * @param {array<number>|number} position - must be 4 or 6 length Array or rotate angle
 * @param {array<array<percent, color>>} colors
 * @return {element}
 */
function createSvgGradient(position, colors)

	if isNumber(position)
		const ends = getPointOnRectByAngle([1, 1], position)
		const starts = getPointOnRectByAngle([1, 1], position + 180)
		position = starts.concat(ends)
		// .map((v, i)=> v + .5)
		
	let type = position.length > 4 ? 'radial' : 'linear'
	let tagName = type + 'Gradient'
	let attrs = type === 'radial' ? ['cx', 'cy', 'r', 'fx', 'fy'] : ['x1', 'y1', 'x2', 'y2']
	
	let node = createSvgNode(tagName)
	
	node.id = 'svg-gradient-123'
	
	if position
		attrs.forEach((key, i)=> {
			let value = position[i]
			if value <= 1
				value = toPercentCase(value)
				
			node.setAttribute(key, value)
		})
	
	colors.forEach((color, i)=> {
		if !isArray(color)
			const percent = 1 / (colors.length - 1) * i
			color = [percent, color]
			
		const stopNode = createSvgNode('stop')
		let offset = color[0]
		if offset <= 1
			offset = toPercentCase(offset)
		stopNode.setAttribute('offset', offset)
		stopNode.setAttribute('stop-color', color[1])
		node.appendChild(stopNode)
	})
	
	return node