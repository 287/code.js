//#!py
/**
 * @include getAngleOfPoint getLengthOfTwoPoint setNodeStyle getArrayValueByIndex
 * @param {array<array<number>>} path
 * @param {object} [op]
 * @param {number} [op.size = 1]
 * @param {string} [op.color = '#333']
 * @param {boolean} [op.arrow = false]
 * @return {element}
 */
function createLineNode(path, op)
	op = Object.assign({
		size: 1,
		color: '#333',
		arrow: false,
		reverse: false,
	}, op)
	
	if op.reverse
		path = path.slice(0).reverse()
	
	let node, type
	
	if path.length === 2
		type = 'line'
		node = createLine(path[0], path[1])
	else
		type = 'polyline'
		node = document.createElement('i')
		for path as p, i
			if i === 0
				continue
				
			node.append(createLine(path[i - 1], p))
			
	node.setAttribute('line-type', type)
	
	if op.arrow
		const target = getArrayValueByIndex(node.childNodes, -1) || node
		node.setAttribute('line-target', '')
		createArrow(target)
		
	return node
	
	function createArrow(pNode)
		for [-45, -135] as angle, i
			const style = {
				bottom: 0,
				width: 10,
				height: op.size,
				transformOrigin: `0 0 0`,
				transform: `rotate(${angle}deg)`,
				background: op.color,
				position: `absolute`,
			}
		
			const node = document.createElement('i')
			setNodeStyle(node, style)
			pNode.append(node)
		
	function createLine(p1, p2)
		const angle = getAngleOfPoint(p1, p2) + 90
		const len = getLengthOfTwoPoint(p1, p2)
		
		const style = Object.assign({
			left: p1[0] - op.size / 2,
			top: p1[1],
			width: op.size,
			height: len,
			transformOrigin: `50% 0 0`,
			transform: `rotate(${angle}deg)`,
			background: op.color,
			position: `absolute`,
		}, op)
		
		const node = document.createElement('i')
		setNodeStyle(node, style)
		return node