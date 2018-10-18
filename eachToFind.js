//#!py
/**
 * @param {function} each
 * @param {any} o
 * @param {function} cb
 * @return {any}
 */
function eachToFind(each, o, cb)
	let rs
	each(o, (value, key)=> {
		if cb(value, key, o)
			rs = value
			return false
	})
	return rs