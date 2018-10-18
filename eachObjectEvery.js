//#!py
/**
 * @include eachObject
 * @param {object} o
 * @param {function} cb
 * @return {boolean}
 */
function eachObjectEvery(o, cb)
	let rs = true
	
	eachObject(o, (value, key)=>{
		if !cb(value, key)
			rs = false
			return false
	})
	
	return rs