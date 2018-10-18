//#!py
/**
 * @desc 遍历所有子节点
 * @desc task返回值：false跳出，true回退index（删除节点时使用），-1跳过子节点的遍历
 * @include isBoolean eachArray
 */	
function eachNodeChilds(node, task, childNodesKey)
	if !childNodesKey
		if node.childNodes
			childNodesKey = 'childNodes'
		else
			childNodesKey = 'childs'
			
	
	let index = 0
	
	eachChild(node, {
		index,
		level: 0,
		subindex: 0,
		getPrevSibling,
		getNextSibling,
	})
	
	function eachChild(node, conf)
		const rs = task(node, conf)
		if isBoolean(rs)
			return rs
		else if rs !== -1
			let childs = node[childNodesKey]
			if childs && childs.length > 0
				eachArray(childs, (childNode, i)=> {
					return eachChild(childNode, {
						level: conf.level + 1, 
						index: ++index,
						subindex: i,
						parent: node,
						getPrevSibling,
						getNextSibling,
					})
				})
				
	function getNextSibling()
		return this.parent && this.parent[childNodesKey][this.subindex + 1]
		
	function getPrevSibling()
		return this.parent && this.parent[childNodesKey][this.subindex - 1]