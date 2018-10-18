//#!py
/**
 * @include isFunction toArray
 */
function pipeAsync(tasks, cb)
	if isFunction(tasks)
		tasks = toArray(arguments)
		cb = tasks.pop()
	
	let finish = false
	let index = 0
	
	if tasks.length > 0
		runTask()
	else
		next()
	
	
	function runTask(args = [])
		tasks[index++](next, ...args)
		
	
	function next(err, ...args){
		if finish
			return
		
		if err != null || index + 1 > tasks.length
			finish = true
			cb(err || null, ...args)
		else
			runTask(args)