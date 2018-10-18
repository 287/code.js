//#!py
/**
 * @include eachToGetArray eachArrayNative
 * @param {array} o
 * @param {function} cb
 * @return {array}
 */
function eachArrayGetArray(o, cb)
	return eachToGetArray(eachArrayNative, o, cb)