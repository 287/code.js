//#!py
/**
 * @include eachArrayNative
 * @param {object} o
 * @param {function} cb
 * @param {any} [context = undefined]
 * @return {undefined|false}
 */
function eachObject(o, cb, context)
	eachArrayNative(Object.keys(o), key=> cb.call(context, o[key], key, o), context)