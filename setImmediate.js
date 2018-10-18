if(typeof setImmediate === 'undefined' && typeof clearImmediate === 'undefined'){
	var setImmediate = function(cb){
		return setTimeout(cb, 0);
	};
	var clearImmediate = function(timer){
		return clearTimeout(timer);
	};
}