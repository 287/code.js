//#!py
function createObjectValueGetter(obj, onNoCache, onReadCache)
	return function(key, ...args)
		let value = obj[key]
		
		if !value
			if onNoCache
				value = onNoCache(key, obj)
				obj[key] = value
				
		if onReadCache
			value = onReadCache(value, ...args)
		
		return value