//#!py
/**
 * @desc 创建一个键值存储器
 * @include isString isBuffer isObject
 * @param {function} getter
 * @param {function} setter
 * @param {string} [type = 'json']
 * @return {function}
 */
function createStorer(getter, setter, type = 'json')
	return store
	
	function store(key, value)
		if value === undefined
			value = getter(key, type)
			
			if type === 'json'
				if isString(value) || isBuffer(value)
					if value.length > 0
						value = JSON.parse(value)
					else
						value = null
		else
			if type === 'json'
				if isObject(value)
					value = JSON.stringify(value)
			
			setter(key, value, type)
					
					
		return value