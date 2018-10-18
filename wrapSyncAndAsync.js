//#!py
/**
 * @desc 用最后一个参数去控制是否使用同异步的方法，使用是用异步cb的方式
 * @include callbackify isBoolean
 * @param {function} syncFn - sync function
 * @param {function} asyncFn - async function
 * @return {function} - support callback function(...args, isSync)
 */
function wrapSyncAndAsync(syncFn, asyncFn)
	const syncFnAsync = callbackify(syncFn)
	function wrap(...args)
		let isSync = false
		if isBoolean(args[args.length - 1])
			isSync = args.pop()
		wrap.select(isSync)(...args)
	
	wrap.async = asyncFn
	wrap.sync = syncFnAsync
	wrap.select = isSync=> isSync ? syncFnAsync : asyncFn
		
	return wrap