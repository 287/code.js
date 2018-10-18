//#!py
/**
 * @param {array} o
 * @param {function} cb
 * @return {boolean}
 */
function eachArraySome(o, cb)
	return Array.prototype.some.call(o, cb)