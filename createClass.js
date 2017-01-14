function createClass(fn, methods){
	if(typeof fn === 'function' && methods && typeof methods === 'object'){
		for(var key in methods){
			fn.prototype[key] = methods[key];
		}
	}
	return fn;
}