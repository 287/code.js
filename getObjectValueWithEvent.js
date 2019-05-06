//#!py
function createObjectValueGetter(obj, key, onNoCache, onReadCache)
	let value = obj[key]
	
	if !value
		if onNoCache
			value = onNoCache(obj, key)
			obj[key] = value
			
	if onReadCache
		value = onReadCache(value, key, obj)
	
	return value