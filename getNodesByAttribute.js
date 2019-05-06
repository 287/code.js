//#!py
/**
 * @include 
 */
function getNodesByAttribute(node, attr = 'node', arrayAttr = attr + 's')
	const nodes = {}
	const attrs = [attr, arrayAttr]
	
	attrs.forEach((attr, i)=> {
		if !attr
			return
		const targets = Array.from(node.querySelectorAll(`[${attr}]`))
		targets.push(node)
		targets.forEach((node)=> {
			const name = node.getAttribute(attr)
			if name
				if i === 0
					nodes[name] = node
				else
					nodes[name] = nodes[name] || []
					nodes[name].push(node)
		})
	})
	
	return nodes