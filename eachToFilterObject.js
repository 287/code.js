//#!py
/**
 * @param {function} each
 * @param {any} o
 * @param {function} cb
 * @return {object}
 */
function eachToFilterObject(each, o, cb)
	let rs = {}
	each(o, (value, key)=> {
		if cb(value, key, o)
			rs[key] = value
	})
	return rs