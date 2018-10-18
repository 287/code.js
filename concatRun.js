//#!py
/**
 * @desc 合并多次执行
 */
function concatRun(task)
	let timer
	
	return run
	
	function run()
		if !timer
			timer = requestAnimationFrame(()=> {
				timer = null
				task.call(this)
			})
	
	run.stop = ()=> {
		cancelAnimationFrame(timer)
		timer = null
	}