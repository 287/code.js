/**
 * @include isFunction, addEvent, removeEvent
 * @param {function} cb
 * @return {boolean}
 */
function addOnceEvent(node, type, cb){
	if(!isFunction(cb)){
		return false;
	}
	function once(){
		cb.apply(null, arguments);
		removeEvent(node, type, once);
	}
	return addEvent(node, type, once);
}