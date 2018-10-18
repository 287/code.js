//#!py
/**
 * @include eachAsync
 * @param {array<any>} params
 * @param {array<function>} tasks
 * @param {function} cb
 * @return {undefined}
 */
function flowAsync(params, tasks, cb)
	eachAsync(
		tasks,
		(next, task)=>{
			task(...params, next)
		},
		cb
	)