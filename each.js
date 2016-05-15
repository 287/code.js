function each(o, fn, type){
	var rs
	, i
	;

	if(o && typeof o === 'object' && typeof fn === 'function'){

		//* array or array like
		type = type === 'array' || (typeof o.length == 'number' && o.length > -1) ? 'array' : type;

		//* loop
		if(type === 'array'){
			for(i = 0; i < o.length; i++){
				if(fn.call(o, o[i], i) === false){
					rs = false;
					break;
				}
			}
		}else{
			for(i in o){
				if(o.hasOwnProperty(i) && fn.call(o, o[i], i) === false){
					rs = false;
					break;
				}
			}
		}
	}

	return rs;
}
