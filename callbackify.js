//#!py
/**
 * @desc 给同步的方法一个类似异步支持cb的参数，且默认try catch
 * @param {function} fn - sync function
 * @return {function} - support callback function
 */
function callbackify(fn)
	return function callbackify(...args)
		const cb = args.pop()
		let err = null
		let rs
		
		try
			rs = fn(...args)
		catch e
			err = e
		
		cb(err, rs)