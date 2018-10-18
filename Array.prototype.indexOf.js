Array.prototype.indexOf = Array.prototype.indexOf || function(value){
	for(var i = 0; i < this.length; i++){
		if(this[i] === value) return i;
	}
	return -1;
};