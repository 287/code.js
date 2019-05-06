//#!py
function concatLoader(loader)
	const callbacks = {}
	
	function load(name, cb)
		if callbacks[name]
			callbacks[name].push(cb)
			return
		else
			callbacks[name] = [cb]
		
		return loader(name, (err, rs)=> {
			callbacks[name].forEach(cb=> cb(err, rs))
			delete callbacks[name]
		})
	
	return load