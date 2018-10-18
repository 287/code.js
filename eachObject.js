//#!py
/**
 * @include eachArray
 * @param {object} o
 * @param {function} cb
 * @param {any} [context = undefined]
 * @return {undefined|false}
 */
function eachObject(o, cb, context)
	eachArray(Object.keys(o), key=> cb.call(context, o[key], key, o), context)