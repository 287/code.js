//#!py
/**
 * @include eachChilds getNodeAttributes
 */
function parseNodeCommands(node, conf)
	const {cmds = {}, prefixs = {}} = conf || {}
	const cmdKeys = ['repeat']
	const ifKeys = ['if', 'else-if', 'else']
	const bindKeys = [].concat(cmdKeys, ifKeys, Object.keys(cmds))
	const prefixKeys = ['', 'attr'].concat(Object.keys(prefixs))
	const typeKeys = ['number', 'int', 'boolean']
	
	const data = {}
	const binds = []
	const repeatNodes = {}
	let nodeIndex = 0
	
	const component = {
		conf,
		data,
		binds,
		// repeatNodes,
		// getLevelsByLevelTemplate,
		emit(key){
			binds.forEach((item)=> {
				if item.keys.includes(key)
					runBindItem(item)
			})
		},
		set(key, value){
			data[key] = value
			this.emit(key)
		},
		assign(obj){
			eachObject(obj, (value, key)=> this.set(key, value))
		},
		addBind,
		run: runBindItem,
		apply: applyChnageByItem,
		node: node.cloneNode(1),
	}
	node.component = component
	node.level = node.uid = 0
	initNode(node)
	
	return component
	
	/**
	 * @include crossArray
	 */
	function getLevelsByLevelTemplate(level)
		const uids = []
		
		level = level.replace(/:(\d+)/g, (t, uid)=> uids.push(repeatNodes[uid].repeatNodes.map(node=> node.uid)) && '~')
		const uidMix = crossArray(...uids)
		 
		const levels = uidMix.map((uids)=> {
			let i = 0
			return level.replace(/~/g, ()=> uids[i++])
		})
		return levels
		
	function clearBindsByLevel(level)
		const levels = getLevelsByLevelTemplate(level)
		for let i = binds.length - 1; i >= 0; i--
			const item = binds[i]
			if levels.some(level=> item.node.level.includes(level))
				binds.splice(i, 1)
	
	function getConfByItem(item)
		return item.prefix ? prefixs[item.prefix] : cmds[item.key]
				
	function applyChnageByItem(item)
		const {node, key, value, prefix} = item
		const conf = getConfByItem(item)
		
		if conf
			if conf.parse
				conf.parse(item, component)
		else if prefix === 'attr'
			/**
			 * @include setNodeAttr
			 */
			setNodeAttr(node, key, value)
		else if ifKeys.includes(key)
			const ifItems = node.ifItems
			const activeIndex = ifItems.findIndex(item=> item.value)
			
			ifItems.forEach((item, i)=> {
				const node = item.node
				if i === activeIndex
					/**
					 * @include insertNodeBefore
					 */
					insertNodeBefore(node, node.placeholder)
					
				else
					/**
					 * @include removeNode
					 */
					removeNode(node)
			})
		else if key === 'repeat'
			clearBindsByLevel(node.level)
			repeatNode(node, value)
		else if key === 'textContent'
			node[key] = parseValueByType(value, 'string', true)
		
	function toValue(key, value)
		select key
			case 'if'
			case 'else-if'
			case 'show'
			case 'hide'
				return !!value
				
		return value
	
	function runBindItem(item, e)
		const {node, task, key, value: lastValue} = item
		let value
		try
			const param = !e ? node.param : Object.assign({
				el: node,
				e,
			}, node.param)
			value = task.call(component, data, param)
		catch err
			console.log(`${key}: ${err.name} ${err.message}`)
			// return
			
		if e
			return value
			
		const conf = getConfByItem(item)
		if conf && conf.valueType
			const {valueType, valueTypes} = conf
			/**
			 * @include parseValueByType getType
			 */
			if !valueTypes.includes(getType(value))
				value = parseValueByType(value, conf.valueType)
			if !valueTypes.includes(getType(value))
				return
			
		if value !== lastValue || !('value' in item)  || isObject(value)
			item.value = value
			applyChnageByItem(item)
	
	/**
	 * @include getParamNamesFromString removeArrayDuplicateValues removeArrayValues
	 */
	function addBind(node, key, exp, marks, prefix)
		const item = {
			node,
			key,
			exp,
			marks,
			prefix,
		}
		
		const keys = getParamNamesFromString(exp)
		removeArrayDuplicateValues(keys)
		if node.param
			removeArrayValues(keys, Object.keys(node.param))
			
		const conf = getConfByItem(item) || {}
			
		const task = wrapExp(exp, conf.withoutReturn)
		
		Object.assign(item, {
			keys,
			task,
			level: node.level,
		})
		
		binds.push(item)
			
		if ifKeys.includes(key)
			const ifItems = binds.filter(tItem=> tItem.node.ifgid === node.ifgid)
			ifItems.forEach(item=> item.node.ifItems = ifItems)
		
		if !prefix
			const nodeBinds = node.nodeBinds = node.nodeBinds || {}
			nodeBinds[key] = item
		
		if conf.init
			conf.init(item, component)
		if conf.notRun
			return
				
		runBindItem(item)
	
	/**
	 * @include 
	 */
	function wrapExp(exp, withoutReturn)
		try
			return Function('param1', 'param2', `with(param1 || {}){ with(param2 || {}){\n\t${withoutReturn ? '' : 'return'} ${exp} \n}}`);
	
	/**
	 * @include insertNodeAfter
	 */
	function initNodePlaceholder(node, msg)
		if !node.placeholder
			const placeholder = document.createComment(msg || 'placeholder')
			insertNodeAfter(placeholder, node)
			node.placeholder = placeholder
		return node.placeholder
		
	/**
	 * @include removeNodes insertNodesBefore
	 */
	function initRepeatNode(node, len)
		node.repeatNodes = node.repeatNodes || []
		const {repeatNodes, shadowNodes, placeholder} = node
		
		// if shadowNodes
			// removeNodes()
		const nodes = repeatNodes.splice(0)
		nodes.forEach((node)=> {
			node.shadowNodes && removeNodes(node.shadowNodes.splice(0))
		})
		removeNodes(nodes)
	
		for let i = 0; i < len; i++
			const newNode = node.cloneNode(true)
			newNode.removeAttribute(':repeat')
			repeatNodes[i] = newNode
			
		insertNodesBefore(repeatNodes, placeholder)
			
	/**
	 * @include isObject isArrayLike isNumber each
	 */
	function repeatNode(node, obj)
		let len
		if isObject(obj)
			len = Object.keys(obj).length
		else if isArrayLike(obj)
			len = obj.length
		else if isNumber(obj)
			len = obj
		
		initRepeatNode(node, len)
		
		const {repeatNodes, repeats, level, placeholder, uid} = node
		let i = 0
		each(obj, (value, key)=> {
			const node = repeatNodes[i]
			const param = node.repeatParam = {}
			if repeats.key
				param[repeats.key] = key
			if repeats.value
				param[repeats.value] = value
			i++
			
			if node.param
				Object.assign(node.param, param)
			else
				node.param = param
			
			// if node.shadow
				// node.shadowNodes = Array.from(node.childNodes)
				
			
			node.uid = nodeIndex++
			node.level = level.slice(0, -uid.toString().length - 2) + node.uid + '/'
			// node.setAttribute && node.setAttribute('level', node.level)
			initNode(node, {
				gids: node.gids,
			})
		})
			
		
	/**
	 * @include trim splitTextNodeByRegexp getObjectByKeys
	 */
	function initTextNode(node)
		let content = node.textContent
		if /\{.*?\}/.test(content)
			splitTextNodeByRegexp(node, /\{.*?\}/g).forEach(([text, placeholder])=> {
				let exp = text.slice(1, -1)
				getObjectByKeys(node, ['uid', 'level', 'param'], placeholder)
				addBind(placeholder, 'textContent', exp)
			})
	
	/**
	 * @include parseEachAsStatement removeNode isNumberLike
	 */
	function initNode(node)
		const op = {
			gids: [0],
		}
		eachChilds(node, (node)=> {
			// node.component = {}
			return parseNode(node, op)
		})
		
	/**
	 * @include parseEachAsStatement removeNode isNumberLike random
	 */
	function parseNode(node, op = {})
		if ![1, 3].includes(node.nodeType)
			return
		
		if !node.uid
			node.uid = nodeIndex++
		const pNode = node.parentNode
		if !node.level
			node.level = (pNode && pNode.level != null ? pNode.level : '/') + node.uid + '/'
			// node.setAttribute && node.setAttribute('level', node.level)
		
		if pNode
			if pNode.param
				if !node.param
					node.param = pNode.param
				else
					Object.assign(node.param, pNode.param)
		
		node.gids = op.gids && op.gids.slice(0) || []
			
		select node.nodeType
			case 3
				return initTextNode(node)
			case 1
				if ['STYLE', 'SCRIPT'].includes(node.tagName)
					return
			default
				return
			
			
		const [cmds, prefixCmds] = getCmds(node)
		
		Object.assign(node, {
			cmds,
			prefixCmds,
		})
		
		// if node.tagName === 'BLOCK'
			// node.shadow = true
		
		if cmds.repeat
			const {value} = cmds.repeat
			initNodePlaceholder(node, `repeat: ${value}`)
			removeNode(node)
			
			node.uid = node.uid
			node.level = node.level.slice(0, -node.uid.toString().length-1) + ':' + node.uid + '/'
			// node.setAttribute && node.setAttribute('level', node.level)
			
			repeatNodes[node.uid] = node
			node.repeatNodes = []
			
			const repeats = parseEachAsStatement(value)
			node.repeats = repeats
			if repeats.object
				if isNumberLike(repeats.object)
				addBind(node, 'repeat', repeats.object)
			
			return -1
			
		const componentNode = conf.getComponentNode(node)
		if componentNode
			node.shadow = true
			node = componentNode
			
		ifKeys.forEach((key)=>{
			if cmds[key]
				const {value} = cmds[key]
				delete cmds[key]
				
				const placeholder = initNodePlaceholder(node, `${key}: ${value}`)
				if key === 'if'
					placeholder.ifgid = node.ifgid = random()
				else
					/**
					 * @include getNodePrevSiblings eachArrayGet
					 */
					node.ifgid = eachArrayGet(getNodePrevSiblings(node, placeholder.nodeType), node=> node.ifgid)
					
				removeNode(node)
				addBind(node, key, value)
		})
		
		for cmds as item, key, -
			addBind(node, key, item.value, item.marks)
		
		for prefixCmds as cmds, prefix, -
			for cmds as item, key, -
				addBind(node, key, item.value, item.marks, prefix)
				
		// eachObject(cmds, ({value, marks}, key)=> {
			// addBind(node, key, value, marks)
		// })
		
		// eachObject(prefixCmds, (cmds, prefix)=> {
			// eachObject(cmds, ({value, marks}, key)=> {
				// addBind(node, key, value, marks, prefix)
			// })
		// })
		
		if componentNode
			return -1
			
	// function getComponentName(node)
		// const tagName = node.tagName.toLowerCase()
		// if tagName.slice(0, 2) === componentPrefix + ':'
			// return tagName.slice(componentPrefix.length + 1)
	
	/**
	 * @include eachObject getNodeAttributes trim
	 */
	function getCmds(node)
		const cmds = {}
		const prefixCmds = {}
		
		eachObject(getNodeAttributes(node), (value, key)=> {
			let prefix, marks
			prefixKeys.some(type=> {
				if key.startsWith(type + ':')
					// node.removeAttribute(key)
					key = key.slice(type.length + 1)
					prefix = type
					return true
			})
			if prefix === undefined
				return
			
			value = trim(value)
			
			if key.includes('.')
				marks = key.split('.')
				key = marks.shift()
			else
				marks = []
				
			if bindKeys.includes(key)
			
			if prefix === ''
				if !bindKeys.includes(key)
					prefix = 'attr'
					
			if prefix
				prefixCmds[prefix] = prefixCmds[prefix] || {}
				prefixCmds[prefix][key] = {
					key,
					value,
					marks,
				}
			else
				cmds[key] = {
					value,
					marks,
				}
		})
		
		return [cmds, prefixCmds]