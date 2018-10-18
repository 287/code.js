//#!py
/**
 * @include eachToGetObject eachObjectNative
 * @param {object} o
 * @param {function} cb
 * @return {object}
 */
function eachObjectGetObject(o, cb)
	return eachToGetObject(eachObjectNative, o, cb)