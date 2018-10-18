//#!py
/**
 * @include eachToEvery eachArray
 * @param {object} o
 * @param {function} cb
 * @return {boolean}
 */
function eachArrayEvery(o, cb)
	return eachToEvery(eachArray, o, cb)