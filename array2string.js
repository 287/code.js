function array2string(array, seps){
	var list = [];
	seps = seps || [',', ';'];
	
	array.forEach(function(item, i){
		list.push(item.join(seps[0]));
	});
	
	return list.join(seps[1]);
}