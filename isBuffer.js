function isBuffer(o){
	return typeof Buffer !== 'undefined' ? Buffer.isBuffer(o) : false;
}