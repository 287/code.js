function logOwnPropertys(obj){
	var o = {};
	for(var key in obj){
		o[key] = obj[key];
	}
	console.log(o);
}