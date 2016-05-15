function isArrayLike(o){
	return o && typeof o.length === 'number' && o.length > -1;
}