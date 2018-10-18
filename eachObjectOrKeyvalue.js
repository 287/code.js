//#!py
/**
 * @desc 参数可以是对象或者key value
 * @include isObject eachObject
 * @param {object|string} key
 * @param {any} value
 * @param {function} cb
 * @return {undefined}
 */
function eachObjectOrKeyvalue(key, value, cb)
	if isObject(key)
		eachObject(key, cb)
	else
		cb(value, key)