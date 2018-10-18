/**
 * @param {function} fn(value, i, array)
 * @param {object} [context]
 * @return {boolean} - fn() ~= true then break and return true; fn() ~= false then return false
 */
Array.prototype.some = Array.prototype.some || function(fn, context){
	for(var i = 0; i < this.length; i++){
		if(fn.call(context, this[i], i, this)){
			return true;
		}
	}
	return false;
};