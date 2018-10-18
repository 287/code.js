//#!py
function getArrayNexter(arr, skip = 0)
	function next(skip = 0)
		let {index, target} = next
		index += skip
			
		if index < target.length
			next.index = index + 1
			return [index, target[index]]
		
	Object.assign(next, {
		index: skip,
		target: arr,
	})
	
	return next