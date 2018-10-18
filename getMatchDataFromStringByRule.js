//#!py
/**
 * @desc 解析匹配规则树
 * @include isString parseMatchRuleStringToTree findIndexFromString isPureObject isArray getArrayValueByIndex trim
 * @param {string} rule
 * @return {object}
 */
function getMatchDataFromStringByRule(string, rule)
	if isString(rule)
		rule = parseMatchRuleStringToTree(rule)
	
	const sliceKeys = ['from', 'to']
	
	const commandMethods = {
		parseJson: JSON.parse,
		trim,
		number: (v)=> v * 1,
		string: (v)=> v + '',
		boolean: (v)=> !!v,
		date: (v)=> Math.floor(new Date(v).getTime() / 1000),
	}
	
	let matchData
	
	parseNodeChilds(rule, string)
	
	return matchData
	
	function getNodeData(node, findFromParent)
		if findFromParent
			node = node.parent
		let data = node.data
		
		while !data
			const {childIndex, parent} = node
			if parent
				for let i = childIndex - 1; i >= 0 && !data; i--
					data = parent.childs[i].data
				
				if !data
					node = parent
					data = node.data
			
		return data
			
		
	function parseNodeCommand(node, string, level)
			
		const {cmd, index} = node
		
		if index !== undefined
			string = getArrayValueByIndex(string, index)
			
			if string === undefined
				return
		
		select cmd
			case 'assign'
				let data = getNodeData(node, true)
				Object.assign(data, string)
				
			case 'join'
				const {cmds} = node
				const sep = parseString(cmds[0])
				string = string.join(sep)
				
			case 'replace'
				const {cmds, from, to} = node
				/**
				 * @include replaceString
				 */
				string = replaceString(string, from, to)
				
			case 'store'
				let {type, name} = node
				let nodeData = type === 'array' ? [] : {}
				
				if matchData === undefined
					matchData = nodeData
				else
					let data = getNodeData(node, true)
					
					if isPureObject(data)
						if name === undefined
							name = 'data'
							
						data[name] = nodeData
					else
						if isArray(data)
							data.push(nodeData)
						
				node.data = nodeData
					
			case 'name'
				let data = getNodeData(node)
							
				const {name} = node
				data[name] = trim(string)
			
			case 'split'
				const {sep, get, each, trim: trimString} = node
				
				string = string.split(sep)
				
				if trimString
					string.forEach((v, i)=> string[i] = trim(v))
				
				if get
					string = string[get]
				else if each
					string.forEach((string, i)=> {
						if string === ''
							return
						parseNodeChilds(node, string, level)
					})
					return true
				
			case 'slice'
				const indexOfKeys = []
				const preIndexs = []
				let indexs = node.indexs
				if !indexs
					indexs = []
					sliceKeys.forEach((sliceKey, i)=> {
						const findStr = node[sliceKey]
						let index
						if findStr !== undefined
							const param = node[`${sliceKey}Param`] || {}
							const reverse = param.last
							const nonuse = param.use ? false : true
							const skip = param.skip || 0
							let skipIndex = reverse ? undefined : i === 0 ? i : preIndexs[0] + node.from.length
							
							index = findIndexFromString(string, findStr, skipIndex, reverse, skip)
							
							preIndexs[i] = index
							
							if index !== -1
								if (i === 0 && nonuse) || (i === 1 && !nonuse)
									index += findStr.length
								
						indexs[i] = index
					})
					if indexs.some(i=> i === -1) || indexs[1] <= indexs[0]
						indexs = null
						
				if !indexs
					string = ''
				else
					string = string.slice(...indexs)
				
			default
				if commandMethods[cmd]
					string = commandMethods[cmd](string)
				
		return string
	
	function parseNodeChilds(parent, string, level = 0)
		if ['', undefined].includes(string)
			return
			
		level++
		
		parent.childs.forEach((node, i)=> {
			Object.assign(node, {
				parent,
				childIndex: i,
			})
			
			const rs = parseNodeCommand(node, string, level)
			if rs === true
				return
			parseNodeChilds(node, rs, level)
		})
		
		
	
	function parseString(str)
		if '"\''.includes(str[0]) && str[0] === str[str.length - 1]
			str = str.slice(1, -1)
		return str
		