//#!py
/**
 * @param {function} each
 * @param {object} o
 * @param {function} cb
 * @return {object}
 */
function eachToGetObject(each, o, cb)
	const rs = {}
	each(o, (value, key)=> {
		value = cb(value, key, o)
		if value !== undefined
			rs[key] = value
	})
	return rs