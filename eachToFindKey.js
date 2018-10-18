//#!py
/**
 * @param {function} each
 * @param {any} o
 * @param {function} cb
 * @return {any}
 */
function eachToFilter(each, o, cb)
	let rs
	each(o, (value, key)=> {
		if cb(value, key, o)
			rs = key
			return false
	})
	return rs