//#!py
/**
 * @param {function} each
 * @param {any} o
 * @param {function} cb
 * @return {boolean}
 */
function eachToSome(each, o, cb)
	let rs = false
	each(o, (value, key)=> {
		if cb(value, key, o)
			rs = true
			return false
	})
	return rs