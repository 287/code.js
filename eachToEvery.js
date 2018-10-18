//#!py
/**
 * @param {function} each
 * @param {any} o
 * @param {function} cb
 * @return {boolean}
 */
function eachToEvery(each, o, cb)
	let rs = true
	each(o, (value, key)=> {
		if !cb(value, key, o)
			rs = false
			return false
	})
	return rs