//#!py
/**
 * @desc 
 * @include findByRecursive
 */	
function getByRecursive(obj, ifTask, elseTask)
	let rs = findByRecursive(obj, ifTask, elseTask)
	if rs != null
		rs = ifTask(rs)
	return rs