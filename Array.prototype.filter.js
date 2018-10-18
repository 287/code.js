/**
 * @include arrayFilter
 * @param {function} cb - cb(value, i, arr)
 * @param {object} [context]
 * @return {array}
 */
Array.prototype.filter = Array.prototype.filter || function(cb, context){
	return arrayFilter(this, cb, context);
};