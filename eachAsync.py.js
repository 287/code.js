/**
 * each a object or array in async callback and run callback after all done 
 * @include isFunction isNumber
 * @param {array|number} o - array to loop
 * @param {function} task - task({function} next, {object} value, {string|number} key)  next(false) to break, next(err) to callback
 * @param {function} [cb] - call this method when loop finished
 * @param {string} [type] - [object|array|number]
 * @return {undefined}
 */
function eachAsync(o, task, op, cb){
	if(isFunction(op)){
		cb = op;
		op = null;
	}
		
	if(isNumber(op)){
		op = {
			limit: op
		}
	}
	
	op = op || {};
	
	let isArray = !isNumber(o);
	let limit = op.limit || 1;
	let finish = false;
	let runningCount = 0;
	let finishCount = 0;
	let runCount = 0;
	let result = [];
	
	if(count() > 0){
		runTask();
	}else{
		next();
	}


	function count(){
		return isArray ? o.length : o;
	}
			
	
	function runTask(){
		for(let i = 0, l = Math.min(limit - runningCount, count() - runCount); i < l && !finish; i++){
			let key = runCount;
			let value = isArray ? o[key] : key;
			runCount++;
			runningCount++;
			task((...args)=> next(key, ...args), value, key, o);
		}
	}
	
	
	function next(index, err, rs){
		if(finish){
			return;
		}
		
		runningCount--;
		
		if(limit > 1 && rs !== undefined){
			result[index] = rs;
		}
		
		if(err != null || ++finishCount >= count()){
			finish = true;
			if(limit > 1){
				rs = result;
			}
				
			cb(err || null, rs, err === false ? index : undefined);
		}else if(runCount < count()){
			runTask();
		}
	}
}