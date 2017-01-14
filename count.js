function count(o){
	var count = 0;
	var key;
	if(o != null){
		if(typeof o.length === 'number' && o.length > -1){
			count = o.length;
		}else{
			for(key in o){
				if(o.hasOwnProperty(key)) count++;
			}
		}
	}
	return count;
}