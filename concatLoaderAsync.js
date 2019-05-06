//#!py
function concatLoaderAsync(loader)
	const loadings = {}
	
	function load(name, ...args)
		if loadings[name]
			return loadings[name]
		
		const context = this
		const promise = loadings[name] = loader.call(context, name, ...args)
		
		promise.then(()=> delete loadings[name])
		
		return promise
	
	return load