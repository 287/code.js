//#!py
function tableArray2echartTreeObject(tableArray, op = {})
	/**
	 * @include isString
	 */
	if isString(op)
		op = 
			name: op
		
	let tree = {
		name: op.name,
		children: [],
	}
	const data = tableArray.slice(1)
	
	loop(data, 0, tree)
	
	// if name === undefined
		// tree = tree.children[0]
	
	return tree
	
	function loop(data, level, pNode)
		/**
		 * @include parseArrayWithGroupBy
		 */
		let groups = parseArrayWithGroupBy(data, level)
		
		for groups as data name -
			const node = {
				name
				children: []
			}
			if op.skip
				if op.skip(name, level)
					continue
					
			pNode.children.push(node)
			
			if level + 1 < data[0].length
				loop(data, level + 1, node)