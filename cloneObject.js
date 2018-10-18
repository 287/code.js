//#!py
/**
 * @include isArray isObject eachArray eachObject
 * @param {any} o
 * @return {any}
 */
function cloneObject(o)

	return clone(o)
	
	function clone(o)
		let rs
		
		if isArray(o)
			rs = []
			eachArray(o, (value)=> rs.push(clone(value)))
		else if isObject(o)
			rs = {}
			eachObject(o, (value, key)=> rs[key] = clone(value))
		else
			rs = o
		
		return rs