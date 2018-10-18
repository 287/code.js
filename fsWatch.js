/**
 * watch file status
 * @require gaze
 * @param {array<string>} glob
 * @param {function} task
 * @param {function} cb
 * @return {undefined}
 */
function fsWatch(glob, task, cb){
	pipeAsync(
		(next)=> gaze(glob),
		(next, watcher)=> {
			watcher
			.on('all', task)
			.on('error', next);
		},
		cb
	);
}