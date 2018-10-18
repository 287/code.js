//#!py
/**
 * @desc 遍历类数组，不支持跳出
 * @param {array} o
 * @param {function} cb
 * @return {undefined}
 */
function eachArrayNative(o, cb)
	Array.prototype.forEach.call(o, cb)