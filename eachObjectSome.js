//#!py
/**
 * @include eachObject
 * @param {object} o
 * @param {function} cb
 * @return {boolean}
 */
function eachObjectSome(o, cb)
	let rs = false
	
	eachObject(o, (value, key)=>{
		if cb(value, key)
			rs = true
			return false
	})
	
	return rs