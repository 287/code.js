//#!py
/**
 * @desc 递归查找
 */
function findByRecursive(obj, ifTask, elseTask)
	
	return run(obj)
	
	function run(obj)
		if ifTask(obj) != null
			return obj
		else
			obj = elseTask(obj)
			if obj != null
				return run(obj)