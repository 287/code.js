//#!py
/**
 * @include eachObjectNative eachToReduce
 * @param {object} o
 * @param {function} cb
 * @param {any} initialValue
 * @return {any}
 */
function eachObjectReduce(o, cb, initialValue)
	return eachToReduce(eachObjectNative, o, cb, initialValue)