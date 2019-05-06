//#!py
/**
 * @include eachToGet eachArraySome
 * @param {any} o
 * @param {function} cb
 * @return {any}
 */
function eachArrayGet(o, cb)
	return eachToGet(eachArraySome, o, cb)