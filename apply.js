/**
 * @include isFunction
 * @param {function} cb
 * @param {array} [args]
 * @param {object} [context]
 */
function apply(cb, args, context){
	if(isFunction(cb)){
		return cb.apply(context, args);
	}
}