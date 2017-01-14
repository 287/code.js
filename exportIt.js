function exportIt(o, key){
	if(typeof window === 'object' && Object.prototype.toString.call(window) === '[object Window]'){
		key = key || o.name;
		window[key] = o;
	}else{
		module.exports = o;
	}
}