//#!py
/**
 * @param {function} each
 * @param {any} o
 * @param {function} cb
 * @param {any} initialValue
 * @return {any}
 */
function eachToReduce(each, o, cb, initialValue)
	let inited = false
	let lastValue
	
	each(o, (value, key)=> {
		if !inited
			inited = true
			
			if initialValue !== undefined
				lastValue = initialValue
			else
				lastValue = value
				return
				
		lastValue = cb(lastValue, value, key, o)
	})
	
	return lastValue