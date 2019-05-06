//#!py
/**
 * @include parseNodeCommands
 */
function parseNodeByColon(node, op)
	const cmds = {
		hide: 'show',
		show: {
			valueType: 'boolean',
			parse(item, component){
				const {node, key} = item
				let {value} = item
				if key === 'hide'
					value = !value
				/**
				 * @include setNodeDisplay
				 */
				setNodeDisplay(node, value)
			},
		},
		class: {
			valueType: 'object',
			parse(item, component){
				const {node, key, value} = item
				/**
				 * @include eachObject
				 */
				const {classList} = node
				eachObject(value, (value, key)=> {
					if value
						classList.add(key)
					else
						classList.remove(key)
				})
			},
		},
		style: {
			valueType: 'object',
			parse(item, component){
				const {node, key, value} = item
				/**
				 * @include eachObject setNodeStyleValue
				 */
				eachObject(value, (value, key)=> {
					setNodeStyleValue(node, key, value)
				})
			},
		},
		options: {
			valueType: ['number', 'array', 'object'],
			parse(item, component){
				const {node, key, value} = item
				/**
				 * @include emptyNode
				 */
				emptyNode(node)
				
				const option = document.createElement('option')
				option.text = '请选择'
				option.value = ''
				// option.disabled = true
				node.appendChild(option)
				each(value, (value, key)=> {
					const option = document.createElement('option')
					option.text = value
					option.value = key
					node.appendChild(option)
				})
				const {nodeBinds} = node
				if nodeBinds.model
					component.apply(nodeBinds.model)
			},
		},
		model: {
			init(item, component){
				const {node, exp, marks} = item
				/**
				 * @include trim
				 */
				let keys = []
				const name = trim(exp.replace(/\[(.*?)\]/g, (t, m)=> keys.push(trim(m)) && ''))
				
				let tmpParam = false
				
				if node.param && Object.keys(node.param).includes(name)
					tmpParam = true
				
				const task = Function('_P_', '_D_', '_V_', `with(_D_ || {}){ with(_P_ || {}){ ${tmpParam ? '' : '_D_.'}${exp} = _V_ }}`)
				const setValue = (v)=>
					try
						task(node.param, component.data, v)
					catch err
						console.log(err)
				
				
				/**
				 * @include valueTypes
				 */
				const valueType = valueTypes.find(type=> marks.includes(type))
				const switchMode = ['checked'].find(type=> marks.includes(type))
				
				Object.assign(item, {
					switchMode,
				})
				
				/**
				 * @include isInputableNode addEvent
				 */
				let bindType = 'change'
				if isInputableNode(node)
					if !marks.includes('lazy')
						bindType = 'input'
				
				/**
				 * @include addEvent
				 */
				addEvent(node, bindType, ()=> {
					let value = node.value
					
					if node.type === 'checkbox'
						if switchMode
							value = node.checked
						else
							/**
							 * @include isArray addArrayValue removeArrayValue
							 */
							if !isArray(item.value)
								item.value = []
							if node.checked
								addArrayValue(item.value, value)
							else
								removeArrayValue(item.value, value)
							
							value = item.value
					else
						if valueType
							value = parseValueByType(value, valueType)
							
					setValue(value)
					component.emit(name)
					
				})
			},
			parse(item, component){
				const {node, value, switchMode} = item
				if node.type === 'checkbox'
					if switchMode
						node.checked = value
					else
						/**
						 * @include isArray
						 */
						if isArray(value)
							node.checked = value.includes(node.value)
				else
					/**
					 * @include parseValueByType
					 */
					node.value = parseValueByType(value, 'string', true)
			},
		},
		log: {
			parse(item){
				const {exp, key, value} = item
				console.log(exp, value)
			}
		},
	}
	
	const prefixs = {
		on: {
			notRun: true,
			withoutReturn: true,
			init(item, component){
				const {node, key} = item
				
				// component.binds.pop()
				
				/**
				 * @include addEvent
				 */
				addEvent(node, key, (e)=> component.run(item, e))
			},
			// parse(item, component){
				// const {node, key} = item
			// },
		},
		set: {
			init(item, component){
				/**
				 * @include toCamelCase
				 */
				item.key = toCamelCase(item.key)
			},
			parse(item, component){
				const {node, key, value} = item
				node[key] = value
			},
		},
		c: {
			init(item, component){
				/**
				 * @include toCamelCase
				 */
				item.key = toCamelCase(item.key)
			},
			parse(item, component){
				const {node, key, value} = item
				// if !node.cparam
					// node.cparam = {}
				// node.cparam[key] = value
			// pNode.shadowNodes = [node]
				// if node.shadowNodes
					// console.log('c:', key, value, node)
				if node.component
					console.log('c:', key, value, node)
					node.component.set(key, value)
			},
		},
	}
	
	const conf = Object.assign({
		cmds,
		prefixs,
		// componentNodes: null,
		loadComponentNode: null,
		getComponentNode(pNode){
			const tagName = pNode.tagName.toLowerCase()
			const name = tagName
			let node
			if this.loadComponentNode
				node = this.loadComponentNode(name)
				
			if !node
				return
				
			node = node.cloneNode(true)
			// pNode.appendChild(node)
			/**
			 * @include random
			 */
			// node.setAttribute(`component-${tagName}`, random())
			insertNodeBefore(node, pNode)
			removeNode(pNode)
			pNode.shadowNodes = [node]
			// parseNodeByColon(node, this)
			// if 
			// pNode.component = node.component
			return node
		},
	}, op)
	
	/**
	 * @include eachObject isString findAliasName
	 */
	eachObject(conf, (conf, key)=> {
		eachObject(conf, (item, key)=> {
			if isString(item)
				conf[key] = findAliasName(item, conf)
			if isString(item.valueType)
				item.valueTypes = [item.valueType]
			else if isArray(item.valueType)
				item.valueTypes = item.valueType
				item.valueType = item.valueType[0]
		})
	})
	
	return parseNodeCommands(node, conf)