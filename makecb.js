/**
 * @param {function} cb
 * @param {object} [context]
 * @return {function}
 */
function makecb(cb, context){
	return function(){
		typeof cb === 'function' && cb.apply(context, arguments);
	};
}