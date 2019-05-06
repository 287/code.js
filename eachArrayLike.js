//#!py
/**
 * @desc 遍历类数组，不支持跳出
 * @param {array} o
 * @param {function} cb
 * @return {undefined}
 */
function eachArrayLike(o, cb, context)
	for let i = 0; i < o.length; i++
		cb.call(context, o[i], i, o)