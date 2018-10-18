/**
 * cb(0)-> addArgs(cb, [1, 2]) -> c(0, 1, 2);
 * 
 * @include isFunction, isArray, toArray, apply
 * @param {function} cb
 * @param {array|*} args
 * @param {*} [context]
 * @return {function}
 */
function addArgs(cb, args, context){
	var reverse;
	if(isFunction(cb)){
		var tmp = args;
		args = cb;
		cb = tmp;
		reverse = true;
	}
	if(!isArray(args)){
		args = [args];
	}
	return function(){
		var _args = toArray(arguments);
		_args = reverse ? args.concat(_args) : _args.concat(args);
		apply(cb, _args, context);
	};
}