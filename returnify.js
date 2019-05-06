//#!py
/**
 * @desc 给同步的异步方法添加一个类似同步的return，即增加一个cb 
 * @param {function} fn - sync function
 * @return {function} - support callback function
 */
function returnify(fn)
	return function returnify(...args)
		let err, rs
		args.push(function callback(error, result){
			err = error
			rs = result
		})
		
		fn.call(this, ...args)
		
		if err
			throw err
			
		return rs
		
		