//#!py
/**
 * @param {number} num
 * @param {function} cb
 * @param {any} [context = undefined]
 * @return {undefined|false}
 */
function eachNumber(num, cb, context)
	for let i = 0, rs; i < num; i++
		rs = cb.call(context, i, i, num)
		if rs === false
			return false
		else if rs === true
			i--