function getKeyByValue(o, value){
	for(var key in o){
		if(o[key] === value) return key;
	}
}