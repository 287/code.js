//#!py
/**
 * @desc 解析匹配规则树
 * @include getTreeFromStringByTab splitStringWithinWrap eachNodeChilds isNumberLike isNumber splitNameWithMethods
 * @param {string} rule
 * @return {object}
 */
function parseMatchRuleStringToTree(rule)
	const tree = getTreeFromStringByTab(rule, {
		isSkip: (line)=> line.startsWith('//') || line.length === 0,
	})
	const sliceKeys = ['from', 'to']
	eachNodeChilds(tree, (node, conf)=> {
		const content = node.content
		if content === ''
			return
		const cmds = splitStringWithinWrap(content, ' ').filter(v=> v !== '')
		delete node.content
		delete node.lineIndex
		delete node.placeholder
		delete node.tabs
		
		if isNumberLike(cmds[0])
			node.index = cmds.shift() * 1
		
		let [cmd, param] = parseNameWithMethods(cmds.shift())
		node.cmd = cmd
		Object.assign(node, param)
		
		select node.cmd
			case 'store'
				node.type = cmds.shift()
				let name = cmds.shift()
				if name !== undefined
					node.name = name
					
			case 'name'
				node.name = cmds.shift()
				
			case 'replace'
				let [from, to = ''] = cmds.map(str=> '"\''.includes(str[0]) ? str.slice(1, -1) : str)
				Object.assign(node, {
					from,
					to,
				})
			
			case 'split'
				let str = cmds.shift()
				if '"\''.includes(str[0])
					str = str.slice(1, -1)
				node.sep = str
				
			case 'slice'
				const ft = [cmds.shift(), cmds.shift()]
				const indexs = ft.map(v=> isNumberLike(v) ? v * 1 : v)

				if isNumber(indexs[0]) && (isNumber(indexs[1]) || indexs[1] === undefined)
					node.indexs = indexs
				else
					ft.forEach((str, i)=> {
						const sliceKey = sliceKeys[i]
						if str !== undefined
							if '"\''.includes(str[0]) && str.length >= 2
								let param
								[str, param] = parseNameWithMethods(str)
								str = str.slice(1, -1)
								node[`${sliceKey}Param`] = param
							
						node[sliceKey] = str
					})
		
		if cmds.length
			node.cmds = cmds
			
		// if parentData && !node.data
			// node.data = parentData
	})
	
	function parseNameWithMethods(name)
		let methods
		[name, methods] = splitNameWithMethods(name)
		
		let param = {}
		methods.forEach(([name, args])=> {
			param[name] = args.length ? args[0] : true
		})
		
		return [name, param]
	
	return tree