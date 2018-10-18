//#!py
/**
 * @include eachObject
 * @param {object} o
 * @param {function} cb
 * @return {object}
 */
function eachObjectFilter(o, cb)
	const rs = {}
	
	eachObject(o, (value, key)=> {
		if cb(value, key, o)
			rs[key] = value
	})
	
	return rs