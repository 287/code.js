//#!py
/**
 * @param {element} node
 * @param {boolean} isShow - is show
 * @return {undefined}
 */
function setNodeDisplay(node, isShow)
	let hideValue = 'none'
	let styleValue = node.style.display
	let cssValue = getComputedStyle(node).display
	let value
	
	if isShow
		// show
		if cssValue === hideValue
			if !styleValue
				value = getDefaultStyleByTagName(node.tagName).display || 'inline'
		if !value
			if styleValue === hideValue
				value = ''
	else
		// hide
		if cssValue !== hideValue
			if !styleValue
				value = 'none'
		if !value
			if styleValue !== hideValue
				value = 'none'
				
	if value != null
		node.style.display = value
		
	function getDefaultStyleByTagName(tagName)
		const node = document.createElement(tagName)
		document.body.appendChild(node)
		const value = getComputedStyle(node)
		document.body.removeChild(node)
		return value
		