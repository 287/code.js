//#!py
/**
 * watch file status with recursive, support [add, change, delete], todo [rename]
 * @require fs
 * @include isDir toUnixPath toDirLike isFunction watchPath readDir eachObject
 * @param {string} dir
 * @param {object} [op]
 * @param {boolean} [op.relative = false]
 * @param {boolean} [op.recursive = true]
 * @param {function} [op.filter]
 * @param {number} [op.delay = 500]
 * @param {function} cb
 * @return {watcher}
 */
function watchDir(path, op, cb)
	if isFunction(op)
		cb = op
		op = null
	
	op = Object.assign({
		relative: false,
		recursive: true,
		filter: null,
		delay: 500,
	}, op)
	
	let prefixLen
	let watcher
	let watchers = {}
	
	if !op.recursive || !isDir(path)
		watcher = watchPath(path, op, emit)
	else
		path = toUnixPath(path, 1)
		if op.relative
			prefixLen = path.length
		watcher = addWatch(path, op, emit)
		watcher.on('close', ()=>{
			removeWatch(path)
		})
		
		let dirs = readDir(path, {
			filter: 'dir',
			recursive: isFunction(op.filter) ? op.filter : op.recursive,
			relative: false
		})
		dirs.forEach((dir)=> {
			if isFunction(op.filter) && !op.filter(path, type)
				return
			addWatch(dir, op, emit)
		})
	
	return watcher

	function isWatch(dir)
		dir = toUnixPath(dir, 1)
		return watchers[dir]
		
	function removeWatch(dir)
		eachObject(watchers, (watcher, path)=>{
			if path.slice(0, dir.length) === dir
				watcher.close()
				delete watchers[path]
		})
		
	function addWatch(dir, op)
		return watchers[dir] = watchPath(dir, op, (type, path)=>{
			if type === 'add'
				if isDir(path)
					path = toDirLike(path)
					if isFunction(op.filter) && !op.filter(path, type)
						return
					addWatch(path)
			else
				if isWatch(path)
					path = toDirLike(path)

					if type === 'delete'
						removeWatch(path)
					else if type === 'change'
						return
				
			emit(type, path)		
		})
		
	function emit(type, path)
		if isFunction(op.filter) && !op.filter(path, type)
			return
		if prefixLen > 0
			path = path.slice(prefixLen)
		cb(type, path)