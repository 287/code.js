//#!py
/**
 * watch file status, support [add, change, delete], todo [rename]
 * @require fs
 * @include isFile toUnixPath isFunction
 * @param {string} dir
 * @param {object} [op]
 * @param {number} [op.delay = 100]
 * @param {function} cb
 * @return {watcher}
 */
function watchPath(path, op, cb)
	if isFunction(op)
		cb = op
		op = null
		
	op = op || {
		delay: 100,
	}
	
	let dir = isFile(path) ? getDirname(path) : path
	dir = toUnixPath(dir, 1)
	// console.log('add watch', path)
	
	const lasts = {}
	const watcher = fs.watch(path, (type, filename)=>{
		// console.log('..........', type, filename)
		
		if lasts[filename]
			if type === 'change' && lasts[filename] === 'rename'
				type = 'add'
			lasts[filename] = type
			return
		else
			lasts[filename] = type
		
		setTimeout(()=> {
			let path = dir + filename
			let type = lasts[filename]
			if type === 'rename'
				if !fs.existsSync(path)
					type = 'delete'
				else
					type = 'add'
					
			emit(type, path)
			delete lasts[filename]
		}, op.delay)
	})
	
	// TODO: rename
	function emit(type, path)
		cb(type, path)
		
	return watcher