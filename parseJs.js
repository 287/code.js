//#!py
/**
 * @include getTreeFromStringByTab serializeTree isStringStartsWith isStringEndsWith isStringWith isStringWiths isStringEndsWiths assignIfNull countChar
 * @param {string} str
 * @param {boolean} [toPyStyle = false] - 转换成py style
 * @return {boolean}
 */
function parseJs(content, toPyStyle)
	// 需添加括号的命令
	const cmdsWithBrackets = ['else if', 'if', 'while', 'switch', 'select', 'for', 'catch', 'finally', 'with']
	const cmdsWithWrap = ['try', 'else', 'function', 'class', 'async']
	const cmdsWithColon = ['case', 'default']
	// const cmdsWithSemicolon = ['break', 'continue']
	const wrapCmds = [].concat(cmdsWithBrackets, cmdsWithWrap)
	const allCmds = [].concat(wrapCmds, cmdsWithColon)
	
	const cmdAlias = {
		select: 'switch',
	}
	
	let multilineIndex = 0
	let multilines = []
	
	function createMultilineKey()
		return `<~${multilineIndex++}~>`
	
	// 替换多行字符串
	content = content.replace(/`[^]*?`/g, (mark)=> multilines.push(mark) && createMultilineKey())
	
	// 替换多行注释
	content = content.replace(/\/\*[^]*?\*\//g, (mark)=> multilines.push(mark) && createMultilineKey())
	
	let blocks = {}
	let lastBlockIndex = 0
	let tree = getTreeFromStringByTab(content, {
		isSkip: (code, conf)=>{
			// 剔除非code行
			if code === '' || /^(<~\d+~>\s*)+$/.test(code) || /^\/\//.test(code)
				blocks[conf.lineIndex] = code
				lastBlockIndex = conf.lineIndex
				return true
		}
	})
	// 添加末行空白行
	let lastNode = tree.childs[tree.childs.length - 1]
	if lastNode && lastNode.lineIndex < lastBlockIndex
		tree.childs.push({
			content: '-',
			childs: [],
			lineIndex: lastBlockIndex,
		})
	
	// 转换成codeNode
	eachNodeChilds(tree, (node, conf)=> {
		node.parent = conf.parent
		
		// 清除无用的折行
		if node.content === '}'
			let prev = conf.getPrevSibling()
			if prev && prev.wrap
				conf.parent.childs.splice(conf.subindex, 1)
				return true
				
		return parseCodeNode(node)
	})
	
	!toPyStyle && eachNodeChilds(tree, (node, conf)=> {
		let {code, cmd, wrap, marks, parent} = node
		
		select cmd
			case 'class'
				// class 的属性
				let [className, extendsName] = code.split(' extends ').map(name=> trim(name))
				Object.assign(node, {
					className,
					extendsName,
				})
				
				// class 的静态属性
				const staticMark = 'static '
				node.childs.filter((node, i, nodes)=> {
					let {code, parent} = node
					
					if i > 0 && nodes[i - 1].shadowCmd === 'static' && isStringStartsWith(code, '}')
						return true
						
					else if isStringStartsWith(code, staticMark)
						code = code.slice(staticMark.length)
						
						// class 的静态属性声明
						if code.includes('=')
							code = `${className}.${code}`
						// class 的静态方法
						else if code.includes('(')
							let index = code.indexOf('(')
							let name = code.slice(0, index)
							code = code.slice(index)
							code = `${className}.${name} = function ${code}`
						// class 的静态属性引用
						else
							code = `${className}.${code} = ${code}`
							
						node.code = code
						node.shadowCmd = 'static'
						return true
					else
						// class的成员方法
						node.wrap = true
						
						if isStringEndsWith(code, '{')
							node.code = trim(code.slice(0, -1))
				}).reverse().forEach((staticNode)=> {
					insertNodeAfter(staticNode, node)
				})
				
				// 继承静态属性
				// if extendsName
					// insertNodeAfter({
						// content: `Object.assign(${className}, ${extendsName})`,
						// childs: [],
					// }, node)
		
	
			// fill catch command after try section
			case 'try'
				let nextSibling = conf.getNextSibling()
				if !nextSibling || nextSibling.cmd !== 'catch'
					insertNodeAfter({
						content: 'catch err',
						childs: [],
					}, node)
					
		if parent
			if parent.cmd === 'class'
				this
			if parent.cmd === 'select'
				if node.childs.length > 0
					wrap = node.wrap = true
					node.childs.push(parseCodeNode({
						content: 'break',
						childs: [],
					}))
		
		if cmd
			// 补齐 ()
			if cmdsWithBrackets.includes(cmd)
				marks[0] += '( '
				marks[1] += ' )'
					
			// 补齐 :
			if cmdsWithColon.includes(cmd)
				marks[1] += ':'
	
		if cmdAlias[cmd] !== undefined
			cmd = node.cmdAlias = cmdAlias[cmd]
			
		if !wrap && !cmd && code !== ''
			// 补齐 ;
			if !['}'].includes(code) && !isStringWiths(code, [','], [';', '.', ',', '(', '{', '['])
				marks[1] += ';'
				
				/*!
					obj
					.method()
				 */
				let nextSibling = conf.getNextSibling()
				if nextSibling && isStringStartsWith(nextSibling.code, '.')
					marks[1] = ''
				// 匹配 o
				/*!
					a = {
						a: 0,
						b: 0,
					}
				 */
				let parent = conf.parent
				if parent && isStringEndsWiths(parent.code, ['(', '[', '{'])
					if parent.childs.length === 1
						marks[1] = ''
					else
						if nextSibling
							if isStringEndsWith(nextSibling.code, ',') || isStringStartsWith(nextSibling.code, ',')
								marks[1] = ''
						else
							let prevSibling = conf.getPrevSibling()
							if prevSibling
								if isStringEndsWiths(prevSibling.code, [',', '(', '{', '[']) || isStringStartsWith(prevSibling.code, ',')
									marks[1] = ''
					
					
				// if wrap && isStringEndsWith(code, '{')
					// code = trim(code.slice(0, -1))
		
		if wrap
			marks[1] += ' {'
	})
	
	content = serializeTree(tree, {
		getWrapStart: (node, conf)=> {
			let {parent} = conf
			let {code, cmd, wrap, marks} = node
			let dist
			
			if toPyStyle
				cmd = cmd ? cmd + ' ' : ''
				dist = `${cmd}${code}`
			else
				if cmdAlias[cmd] !== undefined
					cmd = cmdAlias[cmd]
				if cmd !== '' && code !== ''
					cmd += ' '
				dist = `${cmd}${marks[0]}${code}${marks[1]}`
			
			Object.assign(node, {
				dist,
			})
			
			let rs = []
			eachObject(blocks, (line, index)=>{
				index *= 1
				if node.lineIndex >= index
					rs.push(line)
					delete blocks[index]
			})
			
			rs.push(dist)
			
			return rs
		},
		getWrapEnd: (node, conf)=>{
			let endsStr = null
			if !toPyStyle
				if node.wrap
					// 补齐 }
					endsStr = '}'
				
				// let nextSibling = conf.getNextSibling()
				// if nextSibling && nextSibling.code === '}'
					// endsStr = null
					
			return endsStr
		},
		removeRoot: true,
		withTab: true,
	})
	
	// 去除多余换行符
	content = content.replace(/\}[\s]+(else|else if|catch|finally) /g, (t, cmd)=> `} ${cmd} `)
	
	// 还原多行字符串
	content = content.replace(/<~(\d+)~>/g, (t, index)=> multilines[index])
	
	return content
	

	// 处理node的标准属性
	function parseCodeNode(node)
		let content = node.content
		let {wrap, marks = ['', '']} = node 

		let [cmd, code] = matchCommand(content)
		
		if wrapCmds.includes(cmd)
			wrap = true
			
		else if wrap === undefined
			if node.childs.length > 0
				wrap = true
			
				if cmdsWithColon.includes(cmd)
					wrap = false
					
				else if isStringEndsWiths(code, ['{', '[', '('])
					wrap = false
		
		if wrap && !cmd
			if isStringEndsWith(code, '{')
				code = trim(code.slice(0, -1))
			
		
		Object.assign(node, {
			cmd,
			code,
			wrap,
		})
		
		return assignIfNull(node, {
			type: 'code',
			marks: ['', ''],
		})
		
	// 拆分 cmd 和 code
	function matchCommand(content)
		let code = content
		
		if isStringWith(code, '}', '{')
			code = trim(code.slice(1, -1))
			
		let cmd = allCmds.find(cmd=> isStringStartsWith(code, cmd))
		
		// 匹配出现关键字，但不是命令的情况
		if cmd && cmd !== code && !/^\s|\($/.test(code.charAt(cmd.length))
			cmd = null
			
		if cmd == null
			cmd = ''
			code = content
		else
			code = trim(code.slice(cmd.length))
		
		if !toPyStyle
			if code === '-'
				code = ''
		
		if cmd
			if code.slice(-1) === '{'
				code = trim(code.slice(0, -1))
				
			if cmdsWithBrackets.includes(cmd)
				if isStringWith(code, '( ', ' )') || countChar(code, '(') === 1 && isStringWith(code, '(', ')')
					code = trim(code.slice(1, -1))
					
			else if cmdsWithColon.includes(cmd)
				if isStringEndsWith(code, ':')
					code = trim(code.slice(0, -1))
		else
			if isStringEndsWiths(code, [';'])
				code = trim(code.slice(0, -1))
					
		return [cmd, code]
		
	function insertNodeAfter(node, placeholer)
		let pNode = placeholer.parent
		let childs = pNode.childs
		let index = childs.indexOf(placeholer)
		if !node.marks
			node = parseCodeNode(node)
		if node.parent
			let childs = node.parent.childs
			let index = childs.indexOf(node)
			childs.splice(index, 1)
		node.parent = pNode
			
		childs.splice(index + 1, 0, node)