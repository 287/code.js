//#!py
/**
 * @param {arraylike} o
 * @param {function} cb
 * @param {any|string} [context = undefined] - context === 'reverse' to each reverse
 * @return {undefined|false}
 */
function eachArray(o, cb, context)
	const reverse = context === 'reverse'
	for let i = 0, index, rs; i < o.length; i++
		index = !reverse ? i : o.length - 1 - i
		rs = cb.call(context, o[index], index, o)
		
		if rs === false
			return false
		else if rs === true
			i--