//#!py
/**
 * @include isArray isPureObject
 * @param {any} o
 * @return {any}
 */
function cloneObject(o)

	return clone(o)
	
	function clone(o)
		let rs
		
		if isArray(o)
			rs = []
			for o as value, i
				rs.push(clone(value))
		else if isPureObject(o)
			rs = {}
			for o as value, key, i
				rs[key] = clone(value)
		else
			rs = o
		
		return rs