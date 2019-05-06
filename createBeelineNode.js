//#!py
/**
 * @include getAngleOfPoint getLengthOfTwoPoint isNumber
 * @param {object} style
 * @param {element} [style.parent = document.body]
 * @param {object} [style.attrs = {}]
 * @return {element}
 */
function createBeelineNode(p1, p2, op)
	op = Object.assign({
		color: '#333',
		size: 1,
	}, op)
	
	const style = {
		background: op.color,
		width: op.size,
		transformOrigin: '50% 0 0',
		position: 'absolute',
	}
	
	let angle = getAngleOfPoint(p1, p2)
	
	angle += 90
	
	style.left = p1[0]
	style.top = p1[1]
	
	style.height = getLengthOfTwoPoint(p1, p2)
	
	style.transform = `translateX(-50%) rotate(${angle}deg)`;
	
	const node = op.node || document.createElement('i')
	
	for style as value key -
		if isNumber(value)
			value += 'px'
			
		node.style[key] = value
	
	return node