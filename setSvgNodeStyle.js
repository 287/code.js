//#!py
/**
 * @include eachObject setSvgNodeStyleValue
 * @param {object} [op]
 * @param {number} [op.width = '100%']
 * @param {number} [op.height = '100%']
 * @return {element}
 */
function setSvgNodeStyle(node, op, excludeKeys = [])
	return eachObject(op, (value, key)=> setSvgNodeStyleValue(node, key, value))
	
	const tagName = node.tagName
	// let styleKeys = [
		// 'fontFamily',
		// 'fontSize',
		// 'bold',
	// ]
	let transformKeys = [
		'translate',
	]
	let attrKeys = [
		'd',
	]
	let aliasKeys = {
		left: 'x',
		top: 'y',
		color: 'fill',
		image: 'href',
		path: 'd',
		keepRatio: 'preserveAspectRatio',
	}
	let aliasValues = {}
	
	const ltKeys = ['left', 'top']
	const sizeKeys = ['width', 'height']
	// let limits = {
		// text: 
	// }
	select tagName
		case 'rect'
			if 0 && !op.stroke && op.fill
				ltKeys.forEach((key, i)=>{
					let value = op[key]
					let sep = value - Math.floor(value)
					if sep !== 0
						let sizeKey = sizeKeys[i]
						aliasValues[key] = value - sep
						aliasValues[sizeKey] = op[sizeKey] + sep
					else
						let sizeKey = sizeKeys[i]
						aliasValues[sizeKey] = Math.floor(op[sizeKey])
						
				})
		case 'circle'
			renameObjectKeys(op, {
				x: 'cx',
				y: 'cy',
			})
			
		case 'path'
			this
			// aliasKeys.image = 'href'
	
	let transform
	
	eachObject(op, (value, key)=>{
		if excludeKeys.includes(key)
			return
			
		value = aliasValues.hasOwnProperty(key) ? aliasValues[key] : value
			
		if transformKeys.includes(key)
			transform = transform || []
			transform.push(`${key}(${value})`)
			return
			
		if isObject(value)
			return 
			
			
		if key === 'text' && ['text', 'tspan'].includes(node.tagName)
			return node.textContent = value
		
		key = aliasKeys[key] || key
			
		if attrKeys.includes(key) || key in node
			node.setAttribute(key, value)
		else
			setNodeStyleValue(node, key, value)
	})
	
	if transform
		node.setAttribute('transform', transform.join(' '))
		