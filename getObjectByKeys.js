//#!py
function getObjectByKeys(o, keys, target, nonUndefined)
	const rs = target || {}
	
	keys.forEach(key=> {
		if o[key] === undefined && nonUndefined
			return
			
		rs[key] = o[key]
	})
		
	return rs