//#!py
/**
 * @include isFunction
 * @param {function} fn - like fn(..., {function} cb(err, rs))
 * @param {*} [context]
 * @return {function|promise}
 */
function promisify(fn, noErrorParam)
	return function promisify(...args)
		const context = this
		
		const useCallback = isFunction(args[args.length - 1])
		
		if useCallback
			return fn.call(context, ...args)
			
		else
			return new Promise(function(resolve, reject){
				args.push(function(...args){
					let err
					if !noErrorParam
						err = args.shift()
						
					if err != null
						reject(err)
						
					else	
						resolve(...args)
				})
				
				try
					fn.call(context, ...args)
					
				catch err
					reject(err)
			})