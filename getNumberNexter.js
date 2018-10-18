//#!py
function getNumberNexter(num, skip = 0)
	function next(skip = 0)
		let {index, target} = next
		index += skip
			
		if index < target
			next.index = index + 1
			return [index, index]
		
	Object.assign(next, {
		index: skip,
		target: num,
	})
	
	return next