function isArray(o){
	return Array.isArray ? Array.isArray(o) : o != null && o.constructor === Array;
}