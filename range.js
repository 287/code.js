function range(range, step){
	var list = []
	;
	step = step || 1;
	range = typeof range === 'object' ? range : [0, range - 1];
	
	if(range[0] > range[1]){
		for(i = range[0]; i >= range[1]; i -= step) list.push(i);
	}else{
		for(i = range[0]; i <= range[1]; i += step) list.push(i);
	}
	
	return list;
}