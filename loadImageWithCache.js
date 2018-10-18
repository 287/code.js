//#!py
/**
 * @include isArray isError loadImage
 * @param {string} src
 * @param {function} cb
 * @return {undefined}
 */
function loadImageWithCache(src, cb)
	let caches = loadImageWithCache.caches
	if !caches
		caches = loadImageWithCache.caches = {}
		
	// check
	let cache = caches[src]
	if cache
		if isArray(cache)
			cache.push(cb)
		else if isError(cache)
			cb(cache)
		else
			cb(null, cache)
			return cache
		return 
	
	// load
	caches[src] = [cb]
	loadImage(src, (err, img)=>{
		caches[src].forEach(cb=> cb(err, img))
		caches[src] = err || img
		setTimeout(()=>{
			delete caches[src]
		}, 3 * 60 * 1000)
	})