//#!py
/**
 * @param {function} each
 * @param {any} o
 * @param {function} cb
 * @return {array}
 */
function eachToFilterArray(each, o, cb)
	const rs = []
	each(o, (value, key)=> {
		if cb(value, key, o)
			rs.push(value)
	})
	return rs