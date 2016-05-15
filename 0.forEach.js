Array.prototype.forEach = Array.prototype.forEach || function (fn) {
	var i;
	for(i = 0; i < this.length; i++){
		if(fn.call(this, this[i], i) === false){
			break;
		}
	}
	return this;
};