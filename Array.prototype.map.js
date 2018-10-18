/**
 * @include arrayMap
 * @param {function} cb - cb(value, i, arr)
 * @param {object} [context]
 * @return {array}
 */
Array.prototype.map = Array.prototype.map || function(cb, context){
	return arrayMap(this, cb, context);
};