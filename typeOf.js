var typeOf = function(o){
	return Object.prototype.toString.call(o).match(/ ([^\]]+)/)[1].toLowerCase();
};