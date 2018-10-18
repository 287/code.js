//#!py
/**
 * each a object or array in async callback and run callback after all done 
 * @include isFunction isNumber
 * @param {array|number} o - array to loop
 * @param {function} task - task({function} next, {object} value, {string|number} key)  next(false) to break, next(err) to callback
 * @param {function} [cb] - call this method when loop finished
 * @param {string} [type] - [object|array|number]
 * @return {undefined}
 */
function eachAsync(o, task, op, cb)
	if isFunction(op)
		cb = op
		op = null
		
	if isNumber(op)
		op = {
			limit: op
		}
	
	op = op || {}
	
	const result = []
	const isArray = !isNumber(o)
	const limit = op.limit || 1
	
	let finish = false
	let finishCount = 0
	let index = 0
	
	if count() > 0
		runTask()
	else
		next()


	function count()
		return isArray ? o.length : o
			
	
	function runTask()
		for let i = 0, l = limit; i < l && index < count() && !finish; i++
			let key = index++
			let value = isArray ? o[key] : key
				
			task((...args)=> next(key, ...args), value, key, o)
	
	
	function next(index, err, rs)
		if limit > 1 && rs !== undefined
			result[index] = rs
		
		// continue
		if err === true
			runTask()
			
		// break
		else if err === false
			runcb(null, rs, index)
		
		// error
		else if err != null
			runcb(err, null, index)
		
		// finish
		else if ++finishCount >= count()
			runcb(null, rs)
			
		// next
		else
			runTask()
			
			
	function runcb(err, rs, index)
		if finish
			return
			
		finish = true
		
		if limit > 1 && err == null
			rs = result
			
		cb(err, rs, index)
		