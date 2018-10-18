/**
 * each a object or array in async callback
 * @include isNumber
 * @param {array|number} list - array to loop
 * @param {function} task - task({function} next, {object} value, {string|number} key)
 * @param {function} [finishFn] - call this method when loop finished
 * @param {string} [type] - set object type within [array|object], set by "isArrayLike" if not give this field
 * @return {undefined}
 */
function asyncEach(list, task, cb, type){
	var keys, type, key;
	var i = -1;
	
	if(typeof cb === 'string'){
		type = cb;
		cb = null;
	}else{
		type = type != null ? type : typeof o.length === 'number' ? 'array' : o.constructor.name;
	}
	
	if(list){
		type = type != null ? type : typeof o.length === 'number' ? 'array' : o.constructor.name;
		keys = type === 'object' ? Object.keys(list) : list;
		next();
	}
	
	function next(err, rs){
		if(err === false){
			apply(cb, [null, rs]);
		}else if(err != null){
			apply(cb, [err, rs]);
		}else{
			switch(type.toLowerCase()){
				case 'number':
					
			}
			setTimeout(function(){
				i++;
				if(err === false){
					apply(cb, [null, rs]);
				}else if(err){
					apply(cb, [err, rs]);
				}else{
					if(type === 'for'){
						if(i < list){
							apply(task, [next, i, i, list]);
						}else{
							apply(cb, [null, rs]);
						}
					}else{
						if(i < keys.length){
							key = type === 'array' ? i : keys[i];
							apply(task, [next, list[key], key, list]);
						}else{
							apply(cb, [null, rs]);
						}
					}
				}
			}, 0);
		}
	}
}