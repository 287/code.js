//#!py
/**
 * @desc 
 * @param {object} obj
 * @param {object} [op]
 * @return {element}
 */
function createNodeByObject(obj, op = {})
	const types = ['attribute', 'event', 'property', 'style']
	const pluralMap = {
		attribute: 'attributes',
		property: 'properties',
		event: 'events',
	}
	
	/**
	 * @include eachChildren
	 */
	return eachChildren(obj, (obj, conf)=> {
		let rs
		
		if op.onbeforecreate
			rs = op.onbeforecreate(obj, conf.swap, conf)
			if rs !== undefined
				return rs
			
		let node = op.node
		if !node
			const tagName = obj.tagName || op.tagName || 'node'
			if tagName.startsWith('#')
				select tagName.slice(1)
					case 'text'
						node = document.createTextNode('')
						
					case 'comment'
						node = document.createComment('')
			else
				node = document.createElement(tagName)
		
		for types as type i
			const key = pluralMap[type] || type
			const value = obj[key]
			
			if !value
				continue
				
			for value as v k -
				setNodeKeyValueByType(node, k, v, type)
		
		if conf.swap
			const tNode = conf.swap
			if tNode.nodeType === 1
				tNode.appendChild(node)
			else
				tNode.parentNode.insertBefore(node, tNode)
			
		conf.swap = node
		
		if op.oncreate
			rs = op.oncreate(node, obj, conf)
			if rs !== undefined
				return rs
				
		node = conf.swap
		
		if op.onaftercreate
			return op.onaftercreate(node, obj, conf)
	})
	
	function setNodeKeyValueByType(node, key, value, type)
		select type
			case 'attribute'
				/**
				 * @include isObject object2string
				 */
				if isObject(value)
					value = object2string(value)
				node.setAttribute(key, value)
				
			case 'property'
				node[key] = value
				
			case 'style'
				/**
				 * @include setNodeStyleValue
				 */
				setNodeStyleValue(node, key, value)
			
			case 'event'
				/**
				 * @include isArray
				 */
				if isArray(value)
					value.forEach(value=> node.addEventListener(key, value))
				else
					node.addEventListener(key, value)