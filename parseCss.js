//#!py
/**
 * @desc 编译css - 依赖tab或4个空格缩进层级，不支持单行声明(eg: body{margin:0})，支持单行多行注释，自动补全属性值结尾";"，支持写或不写"{"、"}"
 * @include isBoolean
 * @param {string} css
 * @param {object|boolean} [op] - minify or option
 * @param {boolean} [op.minify = false]
 * @param {boolean} [op.autopx = true]
 * @return {string}
 */
function parseCss(string, op)
	if isBoolean(op)
		op = {minify: op}
		
	op = Object.assign({
		debug: false,
		minify: false,
		autopx: true,
	}, op)
	
	/**
	 * @include getTreeFromStringByTab
	 */
	const tree = getTreeFromStringByTab(string)
	
	
	const symbels = '+-*/'.split('').map(v=> ` ${v} `)
	
	let [WrapStarts, WrapEnds, RuleSep, StyleSep, StyleEnds, LineSep = '', StyleStarts = ''] = '{},:;'
	
	if !op.minify
		RuleSep = `${RuleSep} `
		WrapStarts = ` ${WrapStarts}\n`
		WrapEnds = `\n${WrapEnds}`
		StyleSep = `${StyleSep} `
		StyleStarts = `\t`
		StyleEnds = `${StyleEnds}\n${StyleStarts}`
		LineSep = '\n'
	
	/**
	 * @include eachChilds parseAsStatement cloneObject
	 */
	eachChilds(tree, (node, conf)=>{
		const {parent, subindex} = conf
		let {content} = node
		
		const matchMode = isMatchRule(node)
		node.mode = matchMode ? 'matchRule' : 'styleRule'
		node.rule = content
		
		if matchMode
			Object.assign(node, {
				parent,
				styled: {},
				style: {},
				param: {},
				styles: [],
			})
			
			if !parent
				return
				

			let repeats
			content = content.replace(/:repeat\((.*)\)/, (t, m)=> {
				repeats = parseAsStatement(m)
				let {object} = repeats
				try
					object = Function(`return ${repeats.object}`)()
				catch err
					object = 0
					console.log('parseCss repeat error:', err)
					
				repeats.object = object
				
				if !repeats.object || !repeats.key
					repeats = null
				else
					/**
					 * @include splitSimple
					 */
					repeats.keys = splitSimple(repeats.key.replace(/\$/g, ''))
				return ''
			})
			
			if repeats
				node.content = content
				const nodes = []
				delete node.parent
				
				/**
				 * @include each
				 */
				const {object, keys} = repeats
				each(object, (...args)=> {
					const repeatNode = cloneObject(node)
					const param = {$0: object}
					for keys as key i
						param[key] = args[i]
					repeatNode.repeatParam = param
					nodes.push(repeatNode)
				})
					
				parent.childs.splice(subindex, 1, ...nodes)
				
				return -1
			
			if node.repeatParam
				Object.assign(node.param, node.repeatParam)
				
			
			if content.startsWith('$') && content.endsWith('=')
				const name = trim(content.slice(1, -1))
				parent.param[name] = parent.param[name] || []
				parent.param[name].push(...node.childs)
				parent.childs.splice(subindex, 1)
				return -1
				
			
			if content.startsWith('...')
				parent.childs.splice(subindex, 1)
				let name = content.slice(3)
				if name.startsWith('$')
					name = name.slice(1)
					const childs = getNodeParamValue(parent, name)
					if childs
						parent.childs.splice(subindex, 0, ...childs)
						
				return -1
			
			parseMatchRule(node, parent)
		else
				
			parseStyleRule(node, parent)
			parent.styles.push(node)
			parent.childs.splice(subindex, 1)
			return -1
	})
	
	const cssString = toCssString(tree)
	
	return cssString
	
	/**
	 * @include eachChilds object2string
	 */
	function toCssString(tree)
		const cssObject = {}
		
		eachChilds(tree, (node, conf)=>{
			const {parent, subindex} = conf
			if !parent
				return
				
			const ruleName = node.rules.join(RuleSep)
			cssObject[ruleName] = cssObject[ruleName] || {}
			Object.assign(cssObject[ruleName], node.styled)
		})
		
		const css = []
		
		for cssObject as obj, key, i
			let string = object2string(obj, [StyleSep, StyleEnds])
			if string
				string = StyleStarts + string
				
				css.push(key + WrapStarts + string + WrapEnds)
		
		return css.join(LineSep)
	
	function parseMatchRule(node, parent)
		const {rules: parentRules} = parent
		let {content} = node
		content = parseNodeParam(node, content)
		
		let selfRules = content.split(',').map(v=> trim(v))
		let rules
		if parentRules
			rules = []
			for parentRules as pRule, i
				for selfRules as sRule, j
					let rule
					if sRule.startsWith('&')
						rule = pRule + sRule.slice(1)
					else
						rule = pRule + ' ' + sRule
					rules.push(rule)
		else
			rules = selfRules
		node.rules = rules
	
	/**
	 * @include splitOnce isObject
	 */
	function parseStyleRule(node, parent)
		const {param} = parent
		let {content} = node
		
		if content.includes('=') && content.charAt(0) === '$'
			let [key, value = ''] = splitStatement(content.slice(1), '=')
			value = parseNodeParam(parent, value)
			param[key] = value
			return
		
		let important, autopx = op.autopx
		
		if content.slice(-1) === ';'
			content = content.slice(0, -1)
			autopx = false
			
		if content.slice(-1) === '!'
			content = content.slice(0, -1)
			important = true
			
		content = parseNodeParam(parent, content)
		
		let [key, value = ''] = splitStatement(content)
		
		value = parseNodeStyleRefer(parent, value)
		
		value = value.replace(/;+$/, '')
		
		const rs = parseStyleKeyValue(key, value, parent)
		
		if rs === undefined
			setStyleKeyValue(parent, key, value, autopx, important)
		else if isObject(rs)
			for rs as value, key, i
				setStyleKeyValue(parent, key, value, autopx, important)
		
	/**
	 * @include splitOnce
	 */
	function splitStatement(rule, sep = ':')
		return splitOnce(rule, sep).map(v=> trim(v))
	
	/**
	 * @include padStyleValuePx toSnakeCase
	 */
	function setStyleKeyValue(node, key, value, autopx, important)
		const {style, styled} = node
		if symbels.some(key=> value.includes(key)) && !/[a-zA-Z]/.test(value)
			try
				value = Function(`return (${value})`)() + ''
			catch err
				console.log(err, key, value)
				
		style[key] = value
				
		if important
			value += '!important'
		
		if autopx
			value = padStyleValuePx(key, value)
		key = toSnakeCase(key, '-')
		styled[key] = value
		
	function parseStyleKeyValue(key, value, parent)
		select key
			case 'offset'
				return {
					left: value,
					top: value,
				}
			case 'size'
				return {
					width: value,
					height: value,
				}
			
	/**
	 * @include isStringStartsWiths
	 */	
	function isMatchRule(node)
		if node.childs.length
			return true
			
		let {content} = node
		content = content.replace(/'[^']*?'/g, '').replace(/"[^"]*?"/g, '')
		if isStringStartsWiths(content, ['&', '...']) || ['['].some(s=> content.includes(s))
			return true
		
	function parseNodeStyleRefer(node, value)
		return value.replace(/\&([\w-]*)/g, (t, name)=> getNodeParamValue(node, name, t, 'style'))
	
	function parseNodeParam(node, value)
		return value.replace(/\$\(?\{?(\w*)\}?\)?/g, (t, name)=> getNodeParamValue(node, name, t))
	
	/**
	 * @include getByRecursive ifNull
	 */
	function getNodeParamValue(node, name, defaults, key = 'param')
		return ifNull(getByRecursive(node, node=> node[key] && node[key][name], node=> node.parent), defaults)