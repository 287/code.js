/**
 * @param {object} o - target object
 * @param {string} [name = o.name] - module name
 * @return {object}
 */
function exportModule(o, name){
	name = name || o.name;
	if(typeof define === 'function' && define.amd){
		define(name, [], o);
	}else if(typeof module === 'object' && module.exports){
		module.exports = o;
	}else if(typeof window === 'object' && Object.prototype.toString.call(window) === '[object Window]'){
		window[name] = o;
	}
	return o;
}