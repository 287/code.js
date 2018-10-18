//#!py
/**
 * @param {function} fn - constructor function
 * @param {object} methods - ths methods of class
 * @param {function} fn
 */
function createClass(constructor, methods, ...extend)
	extend.forEach((parent)=> {
		parent
	})
	constructor
	if(typeof fn === 'function' && methods && typeof methods === 'object'){
		for(var key in methods){
			fn.prototype[key] = methods[key];
		}
	}
	return fn;
}