//#!py
/**
 * @include eachToSet eachObject
 * @param {object} o
 * @param {function} cb
 * @return {object}
 */
function eachObjectSet(o, cb)
	return eachToSet(eachObject, o, cb)