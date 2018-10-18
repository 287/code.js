//#!py
/**
 * @include isString eachNodeChilds
 */
function getNodes(wrapNode, op)
	if isString(op)
		op = {
			attr: op
		}
		
	op = Object.assign({
		attr: 'node',
		arrayAttr: '',
	}, op)
	
	let {attr, arrayAttr} = op
	if !arrayAttr
		arrayAttr = attr + 's'
		
	const nodes = {}
	
	eachNodeChilds(wrapNode, (node)=>{
		if node && node.getAttribute
			const name = node.getAttribute(attr)
			if name
				nodes[name] = node
			if arrayAttr
				const name = node.getAttribute(arrayAttr)
				if name
					if !isArray(nodes[name])
						nodes[name] = []
					nodes[name].push(node)
	})
	
	return nodes