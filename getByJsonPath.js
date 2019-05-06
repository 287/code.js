//#!py
function getByJsonPath(obj, key, sep = '.')
	let rs = obj
	if key !== ''
		const keys = key.split(sep)
		
		keys.some((key)=> {
			if rs == null
				return true
				
			rs = rs[key]
		})
		
	return rs