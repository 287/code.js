String.prototype.repeat = String.prototype.repeat || function(num){
	var str = '';
	for(var i = 0; i < num; i++){
		str += this;
	}
	return str;
};