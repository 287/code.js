//#!py
/**
 * @desc 遍历 object，回调返回value生成 array
 * @include eachObject
 * @param {array} keys
 * @param {function} cb
 * @return {object}
 */
function eachObjectMapArray(object, cb)
	const rs = []
	eachObject(object, (...args)=> rs.push(cb(...args)))
	return rs