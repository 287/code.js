//#!py
/**
 * @param {function} each
 * @param {object} o
 * @param {function} cb
 * @return {object}
 */
function eachToMapObject(each, o, cb)
	const obj = {}
	each(o, (value, key)=> {
		obj[key] = cb(value, key, o)
	})
	return obj