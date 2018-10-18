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
				let tNode = document.createElement(node.tagName)
				document.body.appendChild(tNode)
				value = getComputedStyle(tNode).display || 'inline'
				document.body.removeChild(tNode)
			else if styleValue === hideValue
				value = ''
	else
		// hide
		if cssValue !== hideValue
			if !styleValue
				value = 'none'
			else if styleValue !== hideValue
				value = ''
				
	if value != null
		node.style.display = value