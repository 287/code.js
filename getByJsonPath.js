//#!py
/**
 * @include isObject eachArray
 */
function getByJsonPath(o, key, sep = '.')
	let rs
	key = key + ''
	
	if isObject(o)
		rs = o
		eachArray((key + '').split(sep), (key)=>{
			if key === ''
				return 
			if rs == null
				return false
			
			rs = rs[key]
		})
	
	return rs