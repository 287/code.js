//#!py
/**
 * @desc 深层级assign
 * @include isObject isPureObject isArray eachObject addArrayValues
 * @param {object} target
 * @param {...object} source
 * @param {array<string>} [cmds] - ['push', 'add', 'ifNull', 'nonNull', 'hasKey']
 */
function assigns(target, ...args)
	target = isObject(target) ? target : {}
	
	let arrayMode, ifNull, nonNull, hasKey
	if isArray(args[args.length - 1])
		const cmds = args.pop()
		arrayMode = ['push', 'add'].find(key=> cmds.includes(key))
		ifNull = cmds.includes('ifNull')
		nonNull = cmds.includes('nonNull')
		hasKey = cmds.includes('hasKey')
	 
	args.forEach((obj)=> {
		if isObject(obj)
			assign(target, obj)
	})
	
	return target
	
	function assign(target, obj)
		eachObject(obj, (value, key)=> {
			if hasKey
				if !target.hasOwnProperty(key)
					return
					
			if isArray(value)
				if arrayMode && isArray(target[key])
					if arrayMode === 'push'
						target[key].push(...value)
						return
					else if arrayMode === 'add'
						addArrayValues(target[key], value)
						return
				target[key] = value.slice(0)
			else if isPureObject(value)
				if target[key] === undefined
					target[key] = {}
				assign(target[key], value)
			else
				if ifNull
					if target[key] != null
						return
				if nonNull
					if value == null
						return
				target[key] = value
		})