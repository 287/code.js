//#!py
/**
 * @include transformKeys
 * @include setNodeStyleValue trim setNodeAttr
 * @param {svgelement} node
 * @param {string} key
 * @param {string|number} value
 * @return {undefined}
 */
function setSvgNodeStyleValue(node, key, value)
	const attrKeys = ['x', 'y', 'width', 'height', 'r', 'stroke', 'fill', 'd', 'transform', 'fillRule']
	const styleKeys = ['bold', 'italic']
	const aliasKeysGroup = {
		common: {
			left: 'x',
			top: 'y',
			color: 'fill',
			image: 'href',
			path: 'd',
			keepRatio: 'preserveAspectRatio',
			// text: 'textContent',
		},
		circle: {
			left: 'cx',
			top: 'cy',
		},
	}
	
	if key === 'display' && value
		value = ''
	
	if transformKeys.includes(key)
		const transforms = node._transforms = node._transforms || {
			translate: '',
			matrix: '',
		}
		transforms[key] = `${key}(${value})`
		key = 'transform'
		value = Object.values(transforms).join(' ')
		value = trim(value)
	
	if key === 'text' && ['text', 'tspan'].includes(node.tagName)
		node.textContent = value
	else
		key = aliasKeysGroup[node.tagName] && aliasKeysGroup[node.tagName][key] || aliasKeysGroup.common[key] || key
			
		if !attrKeys.includes(key) && (styleKeys.includes(key) || key in node.style)
			setNodeStyleValue(node, key, value)
		else
			setNodeAttr(node, key, value)