function each(o, fn, context, type){
	var rs, i, range
	;
	if(typeof o === 'number'){
		range = [];
		for(i = 0; i < o; i++) range.push(i);
		o = range;
	}
	if(o && typeof o === 'object' && typeof fn === 'function'){
		if(typeof context === 'string'){
			type = context;
			context = null;
		}
		context = context || o;
		type = type === 'array' || (typeof o.length == 'number' && o.length > -1) ? 'array' : type;
		
		if(type === 'array'){
			for(i = 0; i < o.length; i++){
				if(fn.call(context, o[i], i) === false){
					rs = false;
					break;
				}
			}
		}else{
			for(i in o){
				if(o.hasOwnProperty(i) && fn.call(context, o[i], i) === false){
					rs = false;
					break;
				}
			}
		}
	}
	return rs;
}