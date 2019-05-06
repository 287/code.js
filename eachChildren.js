//#!py
/**
 * @desc 遍历所有子节点
 * @desc task返回值：false - 跳出，true - 跳过子节点的遍历，-1 - 回退index（删除节点时使用）
 * @param {object} node
 * @param {function} task
 * @param {string} [childKey]
 * @return {undefined|any}
 */
function eachChildren(node, task, childKey)
	const childKeys = ['childNodes', 'children', 'childs']
	childKey = childKey || childKeys.find(key=> node[key])
	
	let finish = false
	const conf = {
		index: 0,
		subindex: 0,
		level: 0,
		getPrevSibling,
		getNextSibling,
	}
	const rs = task(node, conf)
	/**
	 * @include isBoolean
	 */
	if !isBoolean(rs)
		loopChildren(node, 1, 1, conf.swap)
		
	return conf.swap
		

	function loopChildren(node, level, index, swap)
		if index === 0
			
		else if finish
			return
			
		const children = node[childKey]
		if !children
			return
		
		for children as childNode, i
			const conf = {
				index,
				subindex: i,
				level,
				parent: node,
				swap,
				siblings: children,
				getPrevSibling,
				getNextSibling,
			}
			const rs = task(childNode, conf)
			
			if rs === false
				finish = true
				return
				
			else if rs === true
				continue
				
			/**
			 * @include isNumber
			 */
			else if isNumber(rs)
				i += rs
			
			loopChildren(childNode, level + 1, index + 1, conf.swap)
			
				
	function getNextSibling()
		return this.parent && this.parent[childKey][this.subindex + 1]
		
	function getPrevSibling()
		return this.parent && this.parent[childKey][this.subindex - 1]