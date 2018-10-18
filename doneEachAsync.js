/**
 * each a object or array in async callback and run callback after all done 
 * @include getNextIterator
 * @param {array|object|number} o - array to loop
 * @param {function} task - task({function} next, {object} value, {string|number} key)  next(false) to break, next(err) to callback
 * @param {function} [cb] - call this method when loop finished
 * @param {string} [type] - [object|array|number]
 * @return {undefined}
 */
function doneEachAsync(o, task, op, cb){
	if(isFunction(op)){
		cb = op;
		op = null;
	}
	op = Object.assign({
		limit: 20,
	}, op);
	
	let getNextValue = getNextIterator(o);
	let finish = false;
	let runCount = 0;
	let finishCount = 0;
	let i = 0;
	
	while(i++ < op.limit && runTask()){}
	
	function runTask(){
		if(finish){
			return ;
		}
		let value = getNextValue();
		if(value){
			runCount++;
			task(next, value[1], value[0], o);
			return true;
		}else if(runCount === 0){
			next(false);
		}
	}
	
	function next(err){
		if(finish){
			return ;
		}
		finishCount++;
		if(err === false){
			finish = true;
			err = null;
		}else if(err != null){
			finish = true;
		}else if(!runTask() && finishCount === runCount){
			finish = true;
		}
		
		if(finish){
			cb(err);
		}
	}
}