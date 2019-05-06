//#!py
/**
 * @include isObject
 */
function setByJsonPath(obj, key, value, sep = '.', insertMode = true)
	let rs = obj
	if key !== ''
		const keys = key.split(sep)
		key = keys.pop()
		
		keys.some((key)=> {
			if !isObject(rs[key])
				if insertMode
					rs = rs[key] = {}
				else
					rs = null
					return true
			else
				rs = rs[key]
		})
		
		if isObject(rs)
			rs[key] = value
			return true