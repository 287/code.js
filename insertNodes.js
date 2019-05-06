//#!py
/**
 * @include isFunction callFunction
 * @param {array<element>} nodes
 * @param {element} placeholder
 * @param {string} [type = 'append'] - [after, before, prepend, append]
 * @param {object|function} [op|oninsert]
 * @param {function} [op.oninsert]
 * @param {function} [op.getBody]
 * @param {function} [op.getNode] - by key in [firstChild, lastChild, previousSibling, nextSibling, body]
 * @return {array<element>}
 */
function insertNodes(nodes, placeholder, type, op = {})
	if isFunction(op)
		op = {oninsert: op}
		
	const {getNode, oninsert, getBody} = op
		
	if !Array.isArray(nodes)
		nodes = Array.from(nodes)
		
	select type
		case 'after'
			insertNodesAfter(nodes, placeholder)
				
		case 'before'
			insertNodesBefore(nodes, placeholder)
			
		case 'prepend'
			const firstChild = findNode(placeholder, 'firstChild')
			
			if firstChild
				if nodes[0] === firstChild
					insertNodesAfter(nodes.slice(1), firstChild)
				else
					insertNodesBefore(nodes, firstChild)
			else
				insertNodesAppend(nodes, placeholder)
			
		default
			const lastChild = findNode(placeholder, 'lastChild')
			
			if lastChild
				if nodes[nodes.length - 1] === lastChild
					insertNodesBefore(nodes.slice(0, -1), lastChild)
				else
					insertNodesAfter(nodes, lastChild)
			else
				insertNodesAppend(nodes, placeholder)
				
	return nodes
	

	function insertNodesAppend(nodes, placeholder)
		for nodes as node -
			findNode(placeholder, 'body').append(node)
			callFunction(oninsert, node, placeholder, 'append')
		
	function insertNodesBefore(nodes, placeholder)
		for nodes as node - step -1
			if findNode(placeholder, 'previousSibling') !== node
				placeholder.before(node)
				
				callFunction(oninsert, node, placeholder, 'before')
				
			placeholder = node
	
	function insertNodesAfter(nodes, placeholder)
		for nodes as node -
			if findNode(placeholder, 'nextSibling') !== node
				placeholder.after(node)
				
				callFunction(oninsert, node, placeholder, 'after')
				
			placeholder = node
			
	function findNode(node, key)
		if getBody
			if ['firstChild', 'lastChild'].includes(key)
				return getBody(node)[key]
				
			else if key === 'body'
				return getBody(node)
		
		if getNode
			return getNode(node, key)
			
		if key === 'body'
			return node
			
		return node[key]