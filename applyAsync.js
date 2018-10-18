/**
 * @param {function} cb
 * @param {array} [args]
 * @param {object} [context]
 */
function applyAsync(cb, args, context){
	if(typeof cb === 'function'){
		setTimeout(function(){
			cb.apply(context, args);
		}, 0);
	}
}