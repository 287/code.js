//#!py
/**
 * @include eachToGetArray eachObjectNative
 * @param {object} o
 * @param {function} cb
 * @return {array}
 */
function eachObjectGetArray(o, cb)
	return eachToGetArray(eachObjectNative, o, cb)