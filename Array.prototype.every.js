/**
 * @param {function} fn(value, i, array)
 * @param {object} [context]
 * @return {boolean} - fn() ~= true then return true; fn() ~= false then break and return false
 */
Array.prototype.every = Array.prototype.every || function(fn, context){
	for(var i = 0; i < this.length; i++){
		if(!fn.call(context, this[i], i, this)){
			return false;
		}
	}
	return true;
};