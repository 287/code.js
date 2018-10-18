function isNodejs(){
	return typeof global === 'object' && typeof process === 'object' && typeof module === 'object';
}