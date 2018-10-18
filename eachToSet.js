//#!py
/**
 * @param {function} each
 * @param {any} o
 * @param {function} cb
 * @return {any}
 */
function eachToSet(each, o, cb)
	each(o, (value, key)=> o[key] = cb(value, key, o))
	return o