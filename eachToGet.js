//#!py
/**
 * @param {function} each
 * @param {any} o
 * @param {function} cb
 * @return {any}
 */
function eachToGet(each, o, cb)
	let rs
	each(o, (value, key)=> {
		rs = cb(value, key, o)
		if rs !== undefined
			return true
	})
	return rs