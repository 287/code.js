//#!py
/**
 * @include eachObject
 * @param {object} o
 * @param {function} cb
 * @return {any}
 */
function eachObjectFind(o, cb)
	let rs
	
	eachObject(o, (value, key)=>{
		if cb(value, key)
			rs = value
			return false
	})
	
	return rs