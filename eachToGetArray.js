//#!py
/**
 * @param {function} each
 * @param {array} o
 * @param {function} cb
 * @return {array}
 */
function eachToGetArray(each, o, cb)
	const rs = []
	each(o, (value, key)=> {
		value = cb(value, key, o)
		if value !== undefined
			rs.push(value)
	})
	return rs