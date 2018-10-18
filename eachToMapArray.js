//#!py
/**
 * @param {function} each
 * @param {array} o
 * @param {function} cb
 * @return {array}
 */
function eachToMapArray(each, o, cb)
	const rs = []
	each(o, (value, key)=> {
		rs.push(cb(value, key, o))
	})
	return rs