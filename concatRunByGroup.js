//#!py
/**
 * @desc 合并多次执行
 * @include emptyObject
 */
function concatRunByGroup(task)
	const group = {}
	let timer
	
	Object.assign(run, {
		task,
		group,
		stop: function(){
			cancelAnimationFrame(timer)
			timer = null
		},
	})
	
	return run
	
	function run(...args)
		if !timer
			timer = requestAnimationFrame(()=> {
				timer = null
				task(group)
				emptyObject(group)
			})
		
		args.forEach(key=> {
			if key != null
				group[key] = true
		})