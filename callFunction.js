//#!py
/**
 * @include isFunction
 * @param {function} fn
 * @param {...} arg
 */
function callFunction(cb, ...args)
	if isFunction(cb)
		return cb(...args)