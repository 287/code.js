//#!py
/**
 * @include eachArraySome
 * @param {object} o
 * @param {function} cb
 * @return {boolean}
 */
function eachObjectSome(o, cb)
	return eachArraySome(Object.keys(o), (key)=> cb(o[key], key))