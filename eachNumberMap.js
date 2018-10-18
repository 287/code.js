//#!py
/**
 * @include eachToMapArray eachNumber
 * @param {number} num
 * @param {function} cb
 * @param {any} [context = undefined]
 * @return {array}
 */
function eachNumberMap(num, cb, context)
	return eachToMapArray(eachNumber, num, cb, context)