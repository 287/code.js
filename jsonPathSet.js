function jsonPathSet(o, key, value){
	var sep = '/'
	, target
	;
	o = o == null ? {} : o;
	if(typeof o !== 'object'){
		// throw('jsonpath set "/" error: target not a object');
		o = {'': o};
	}
	if(key !== sep){
		if(typeof key != 'string' || key.indexOf(sep) === -1){
			o[key] = value;
		}else{
			target = o;
			keys = key.split(sep);
			keys.forEach(function(k, i){
				if(i == 0 && k === '') return;
				if(i === keys.length - 1){
					target[k] = value;
				}else{
					target[k] = target[k] == null ? {} : target[k];
					if(typeof target[k] !== 'object'){
						// throw('jsonpath set "' + key + '" error: "' + keys.slice(0, i + 1).join(sep) +'" is exists and not a object');
						target[k] = {'': target[k]};
					}
				}
				target = target[k];
			});
		}
	}else{
		o = value;
	}

	return o;
}