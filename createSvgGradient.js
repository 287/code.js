//#!py
/**
 * @include isNumber isArray createSvgNode toPercentCase getPointOnRectByAngle setNodeAttrs random
 * @param {array<number>|number} position - must be 4 or 6 length Array or rotate angle
 * @param {array<array<color, percent>>} colors
 * @return {element}
 */
function createSvgGradient(type, position, colorStops)
	const tagName = type + 'Gradient'
	const node = createSvgNode(tagName)
	const param = {
		id: 'gradient-' + random().toString(36)
	}

	if isNumber(position)
		const ends = getPointOnRectByAngle([1, 1], position)
		const starts = getPointOnRectByAngle([1, 1], position + 180)
		position = starts.concat(ends)
		position = position.map(v=> toPercentCase(v))
		
		['x1', 'y1', 'x2', 'y2'].forEach((key, i)=> param[key] = position[i])
	else
		position = position.map(v=> toPercentCase(v))
		position.forEach((v, i)=> {
			['c', 'f'].forEach((key)=> {
				param[`${key}${xyKeys[i]}`] = position[i]
			})
		})
		param.r = '100%'
		
	setNodeAttrs(node, param)
	
	// let type = position.length > 4 ? 'radial' : 'linear'
	// let attrs = type ===  ? ['cx', 'cy', 'r', 'fx', 'fy'] : ['x1', 'y1', 'x2', 'y2']
	
	
	colorStops.forEach((colorStop, i)=> {
		let color, offset
		if !isArray(colorStop)
			color = colorStop
			offset = 1 / (colorStops.length - 1) * i
		else
			[color, offset] = colorStop
			if offset <= 1
				offset = toPercentCase(offset)
			
		const stopNode = createSvgNode('stop')
		setNodeAttrs(stopNode, {
			offset,
			'stop-color': color,
		})
		node.appendChild(stopNode)
	})
	
	return node