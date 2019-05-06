//#!py
function toOnceFunction(task)
	let execed = false
	
	return onceCallback
	
	function onceCallback(...args)
		if execed
			return
			
		execed = true
		
		return task(...args)