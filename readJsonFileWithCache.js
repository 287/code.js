//#!py
/**
 * @include readJsonFile
 * @param {string} path
 * @param {number} [cacheTime = 30] - 秒
 * @param {function} cb
 * @return {undefined}
 */
function readJsonFileWithCache(path, cacheTime)
	const cache = readJsonFileWithCache.cache = readJsonFileWithCache.cache || {}
		
	if !cache[path]
		cacheTime = cacheTime || 30
		cacheTime *= 1000
		console.log('readJson', path)
		setTimeout(()=> {
			delete cache[path]
		}, cacheTime)
		
		cache[path] = readJsonFile(path)
	return cache[path]