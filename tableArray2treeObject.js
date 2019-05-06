//#!py
function tableArray2treeObject(tableArray, op = {})
	/**
	 * @include isString
	 */
	if isString(op)
		op = 
			name: op
			
	let {
		name,
		skip,
		hasValue = false,
		useNullValue = true,
	} = op
		
	const fields = tableArray[0]
	let treeFieldSize = fields.length
	let valueFieldIndex = -1
	
	if hasValue
		valueFieldIndex = --treeFieldSize
		
	let tree = {
		name: name,
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
			if valueFieldIndex !== -1
				node.value = data.reduce((total, item)=> total + item[valueFieldIndex] * 1, 0)
				
			if skip
				if skip(name, level)
					continue
			
			if !useNullValue
				if [undefined, null, ''].includes(name)
					continue
					
			pNode.children.push(node)
			
			if level + 1 < treeFieldSize
				loop(data, level + 1, node)
			// else if valueFieldSize
				// node.value = data[0][level + 1] * 1
				
				