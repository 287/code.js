//#!py
/**
 * @include isFunction readJsonFileAsync
 * @param {string} path
 * @param {number} [cacheTime = 30] - 秒
 * @param {function} cb
 * @return {undefined}
 */
function readJsonFileWithCacheAsync(path, cacheTime, cb)
	const cache = readJsonFileWithCacheAsync.cache = readJsonFileWithCacheAsync.cache || {}
	if isFunction(cacheTime)
		cb = cacheTime
		cacheTime = cb
		
	if cache[path]
		cb(null, cache[path])
	else
		cacheTime = cacheTime || 30
		cacheTime *= 1000
		// console.log('readJson', path)
		readJsonFileAsync(path, (err, data)=>{
			if !err
				cache[path] = data
				setTimeout(()=> {
					delete cache[path]
				}, cacheTime)
			cb(err, data)
		})