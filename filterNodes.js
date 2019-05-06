//#!py
function filterNodes(nodes, filtes)
	const arr = []
	
	outer:
	for nodes as node, i
		for filtes as value, key, i
			const nodeValue = node[key]
			if isArray(value)
				if !value.includes(value)
					continue outer
			else
				if value !== nodeValue
					continue outer
			
	function isNodeMatchSelector(node, selector)
	
	function isNodeMatchSelectorValue(node, key, values)
		let nodeValue = node[key]
		select key
			case 'tagName'
				nodeValue = node.tagName.toLowerCase()
				return values.includes(nodeValue)
				
			case 'class'
				nodeValue = Array.from(node.classList)
				return nodeValue.every(value=> values.includes(value))
				
			default
				nodeValue = node.getAttribute(key)