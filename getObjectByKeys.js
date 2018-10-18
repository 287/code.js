function getObjectByKeys(o, keys, target){
	var rs = target || {};
	keys.forEach(function(key){
		rs[key] = o[key];
	});
	return rs;
}