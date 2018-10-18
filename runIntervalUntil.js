//#!py
/**
 * @include isFunction
 * @param {array<array>} 
 * @return {string}
 */
function runIntervalUntil(task, interval, cb)
	if isFunction(interval)
		cb = interval
		interval = null
	interval = interval || 100
	
	let index = 0
	let rs
	const timer = setInterval(()=> {
		rs = task(index++)
		if rs
			runcb()
	}, interval)
	
	function runcb()
		clearInterval(timer)
		cb(null, rs)
		