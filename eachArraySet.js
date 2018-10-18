//#!py
/**
 * @include eachToSet eachArrayNative
 * @param {array} o
 * @param {function} cb
 * @return {array}
 */
function eachArraySet(o, cb)
	return eachToSet(eachArrayNative, o, cb)