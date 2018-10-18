//#!py
/**
 * @include eachObject
 * @param {object} o
 * @param {function} cb
 * @return {any}
 */
function eachObjectFindKey(o, cb)
	let rs
	
	eachObject(o, (value, key)=>{
		if cb(value, key)
			rs = key
			return false
	})
	
	return rs