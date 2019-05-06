//#!py
/**
 * @include eachArraySome
 * @param {object} o
 * @param {function} cb
 * @return {boolean}
 */
function eachObjectEvery(o, cb)
	return !eachArraySome(Object.keys(o), (key)=> !cb(o[key], key))