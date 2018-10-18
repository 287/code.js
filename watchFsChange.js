//#!py
/**
 * watch file status
 * @require gaze
 * @include isObject
 * @param {array<string>} glob
 * @param {object} [op]
 * @param {array<string>} [op.types = [all]]
 * @param {number} [op.delay = 0]
 * @param {function} task
 * @param {function} errcb
 * @return {watcher}
 */
function watchFsChange(...args)
	if !isObject(args[1])
		args[1] = {}
		
	const [glob, op, task, errcb] = args
	op.types = op.types || ['all']
	op.debounceDelay = op.delay || 500
	
	const watcher = new gaze.Gaze(glob, op)
	op.types.forEach((type)=> watcher.on(type, task))
	errcb && watcher.on('error', errcb)
	
	return watcher