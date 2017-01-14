function jsonPath(o, key){
	var sep = '/'
	, rs = o
	;
	if(o && typeof o === 'object'){
		if(key !== sep){
			if(typeof key != 'string' || key.indexOf(sep) === -1){
				rs = o[key];
			}else{
				key.split(sep).forEach(function(k, i){
					if(rs == null) return;
					if(i == 0 && k === '') return;
					rs = rs[k] ;
				});
			}
		}
	}
	return rs;
}