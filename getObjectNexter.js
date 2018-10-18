//#!py
function getObjectNexter(obj, skip = 0)
	function next(skip = 0)
		let {index, keys, target} = next
		index += skip
			
		if index < keys.length
			next.index = index + 1
			const key = keys[index]
			return [key, target[key]]
		
	Object.assign(next, {
		index: skip,
		target: obj,
		keys: Object.keys(obj),
	})
	
	return next