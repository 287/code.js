//#!py
/**
 * @desc 合并多次执行
 */
function concatTimeout(task, interval = 0)
	function run(...args)
		run.taskArgs = args
		if !run.timer
			run.timer = setTimeout(()=> {
				run.timer = null
				task.call(this, ...run.taskArgs)
			}, interval)
	
	run.stop = ()=> {
		clearTimeout(run.timer)
		run.timer = null
	}
	
	return run