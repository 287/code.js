//#!py
/**
 * @include eachToMapObject eachObjectNative
 * @param {object} o
 * @param {function} cb
 * @return {object}
 */
function eachObjectMap(o, cb)
	return eachToMapObject(eachObjectNative, o, cb)