//#!py
/**
 * @include isFunction toArray
 * @param {array<function>|function} tasks - task({function} cb);
 * @param {number} [limit = 10] - concurrency number
 * @param {function} cb - cb({error|null} err, {array} results, {number} [errorIndex]);
 * @return {undefined}
 */
function doneAsync(tasks, limit, cb)
	if isFunction(tasks)
		tasks = toArray(arguments)
		cb = tasks.pop()
		limit = !isFunction(tasks[tasks.length - 1]) ? tasks.pop() : null
	else
		if isFunction(limit)
			cb = limit
			limit = null
	
	limit = limit || 10
	
	let finish = false
	let finishCount = 0
	let runCount = 0
	let result = []
	
	if tasks.length > 0
		for let i = 0, l = Math.min(tasks.length, limit); i < l && !finish; i++
			runTask()
	else
		next()
	
	
	function runTask()
		let index = runCount++
		tasks[index]((...args)=> next(index, ...args), index)
		
	
	function next(index, err, rs){
		if finish
			return
		
		result[index] = rs
		
		if err != null || ++finishCount >= tasks.length
			finish = true
			cb(err || null, result, err === false ? index : undefined)
		else if runCount < tasks.length
			runTask()