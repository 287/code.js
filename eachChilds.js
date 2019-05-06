//#!py
/**
 * @desc 遍历所有子节点
 * @desc task返回值：false - 跳出，true - 跳过子节点的遍历，-1 - 回退index（删除节点时使用）
 * @include isBoolean eachArraySome
 */	
function eachChilds(node, task, childsKey)
	const childsKeys = ['childNodes', 'childs']
	childsKey = childsKey ? childsKey : childsKeys.find(key=> node[key])
	
	eachLoop(node, null, 0, 0, 0)
	
	function eachLoop(node, parent, index, subindex, level)
		const rs = task(node, {
			index,
			subindex,
			level,
			parent,
			getPrevSibling,
			getNextSibling,
		})
		
		select rs
			case false
			case -1
				return rs
			case true
				return
	
		const childs = node[childsKey]
		
		for childs as childNode, i
			const rs = eachLoop(childNode, node, ++index, i, level + 1)
			select rs
				case false
					return rs
				case -1
					i--
				
	function getNextSibling()
		return this.parent && this.parent[childsKey][this.subindex + 1]
		
	function getPrevSibling()
		return this.parent && this.parent[childsKey][this.subindex - 1]
		