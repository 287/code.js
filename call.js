/**
 * @param {function} fn
 * @param {...} arg
 */
function call(cb){
	if(typeof cb === 'function'){
		var args = [].slice.call(arguments, 1);
		return cb.apply(null, args);
	}
}