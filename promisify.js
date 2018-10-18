/**
 * @param {function} fn - like fn(..., {function} cb(err, rs))
 * @param {*} [context]
 * @return {function|promise}
 */
function promisify(fn, context){
	return function promisify(){
		context = context || this;
		var args = Array.prototype.slice.call(arguments);
		var cbMode = typeof args[args.length - 1] === 'function';
		return cbMode ? fn.apply(context, args) : new Promise(function(resolve, reject){
			args.push(function(err){
				if(err != null){
					reject(err);
				}else{
					resolve.apply(null, Array.prototype.slice.call(arguments, 1));
				}
			});
			try{
				fn.apply(context, args);
			}catch(err){
				reject(err);
			}
		});
	};
}