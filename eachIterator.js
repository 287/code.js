/**
 * @param {iterator} o
 * @param {function} cb
 * @param {any} [context = undefined]
 * @return {undefined|false}
 */
function eachIterator(o, cb, context){
	for(let [key, value] of o){
		if(cb.call(context, value, key, o) === false){
			return false;
		}
	}
}