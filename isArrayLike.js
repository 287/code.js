var isArrayLike = function(o){
	return o && typeof o.length=='number' && o.length>-1;
};