//#!py
/**
 * @desc 遍历对象，不支持跳出
 * @include eachArrayNative
 * @param {object} o
 * @param {function} cb
 * @return {undefined}
 */
function eachObjectNative(o, cb)
	eachArrayNative(Object.keys(o), (key, i)=> cb(o[key], key, o))