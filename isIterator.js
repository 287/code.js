/**
 * @include isFunction
 * @param {any} o
 * @return {boolean}
 */
function isIterator(o){
	return o != null && Symbol.iterator in o && isFunction(o.next);
}