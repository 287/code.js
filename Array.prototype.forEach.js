/**
 * @param {function} fn(value, i, array)
 * @param {object} [context]
 * @return {undefined}
 */
Array.prototype.forEach = Array.prototype.forEach || function(fn, context){
	for(var i = 0; i < this.length; i++){
		fn.call(context, this[i], i, this);
	}
};