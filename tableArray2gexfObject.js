//#!py
/**
 * @param {array} tableArray
 * @param {object} [op]
 * @param {boolean} [op.useIndex = true] - 为true时可以保证各列内的数据即使值一致也能保证不重复
 * @param {boolean} [op.fillLineName = false] - 为true时每一列的后一列作为连线上的文字
 * @param {boolean} [op.useNullValue = true] - 为false时会筛选掉node name为空的节点
 * @return {object}
 */
function tableArray2gexfObject(tableArray, op = {})
	const nodes = []
	const categories = []
	const links = []
	
	const titles = tableArray[0]
	const rowArray = tableArray.slice(1)
	
	let {
		cycle,
		useIndex = true,
		fillLineName = false,
		useNullValue = true,
	} = op
	
	cycle = cycle || titles.length
	
	let colStep = 1
	
	if fillLineName
		colStep += 1
	
	
	/**
	 * @include row2col removeArrayDuplicateValues
	 */
	const colArray = row2col(rowArray).map(arr=> removeArrayDuplicateValues(arr))
	if !useNullValue
		/**
		 * @include removeArrayValues
		 */
		colArray.forEach(arr=> removeArrayValues(arr, [undefined, null, ''])) 
	
	const colAddIndexs = []
	
	if useIndex
		for colArray.length as i
			let added = 0
			// if i !== 0
				
			for i as index
				added += colArray[index].length
				
			colAddIndexs[i] = added
		
		
	const colIndexCategoryIdMap = {}
	
	for titles as name i step colStep
		const id = i % cycle
		
		colIndexCategoryIdMap[i] = id
		
		if i > cycle - 1
			continue
			
		categories.push({
			name,
		})
		
	
	for colArray as arr index step colStep
		for arr as name -
			let id = nodes.length + ''
			
			if !useIndex
				if nodes.some(node=> node.name === name)
					continue
					
			const category = colIndexCategoryIdMap[index]
			
			nodes.push({
				name,
				id: useIndex ? id : undefined,
				category,
				// value: '',
				// category: titles[index],
			})
			
	// const links = []
			
	for rowArray as arr -
		// let counts = {}
		for arr.length - 1 as i step colStep
			let source = arr[i]
			let target = arr[i + colStep]
			let name = fillLineName ? arr[i + 1] : undefined
			
			if useIndex
				source = colArray[i].indexOf(source) + colAddIndexs[i]
				target = colArray[i + colStep].indexOf(target) + colAddIndexs[i + 1]
					
				source += ''
				target += ''
			else
				if !nodes.some(node=> node.name === source)
					continue
					
				if !nodes.some(node=> node.name === target)
					continue
					
				if links.some(node=> node.source === source && node.target === target)
					continue
			// else
				// source = nodes.findIndex(node=> node.name === source)
				// target = nodes.findIndex(node=> node.name === target)
				
				// if source === -1 || target === -1
					// continue
					
			// source += ''
			// target += ''
				
			// const key = `${source}-${target}`
			
			if links.some(item=> item.source === source && item.target === target)
				continue
			
			let value = rowArray.reduce((c, arr)=> c + (arr[i] === source && arr[i + 1] === target ? 1 : 0), 0)
			
			const item = {
				id: name,
				source,
				target,
				value,
			}
			
			// if fillLineName
				// item.name = arr[i + 1]
				
			links.push(item)
			
	return {
		nodes,
		links,
		edges: links,
		categories,
	}