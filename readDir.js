//#!py
/**
 * @require fs
 * @include isObject isFunction isString toUnixPath
 * @param {string} dir
 * @param {object} [op]
 * @param {boolean} [op.relative = true]
 * @param {boolean} [op.withStat = false]
 * @param {boolean} [op.recursive = false]
 * @param {string|function} [op.filter = null]
 * @return {array}
 */
function readDir(dir, op)
	if op && !isObject(op)
		op = {withStat: true}

	op = Object.assign({
		relative: true,
		withStat: false,
		recursive: false,
		filter: null,
	}, op)
	
	let filterType = op.filter || null
	if filterType
		if isFunction(filterType)
			filterType = 'f'
		else if !isString(filterType)
			filterType = null
	
	const baseDir = toUnixPath(dir, 1)
	const list = []
	
	readDirLoop('')
		
	return list
	
	function readDirLoop(dir)
		fs.readdirSync(baseDir + dir).forEach((path, i)=>{
			path = dir + path
			
			const stats = fs.statSync(baseDir + path)
			const isDir = stats.isDirectory()
			
			if isDir
				path += '/'
				
			let rs = path
			
			if !op.relative
				rs = baseDir + path
						
			if filterType === null || filter(path, isDir)
				list.push(op.withStat ? [rs, stats] : rs)
			
			if isDir && op.recursive
				if isFunction(op.recursive) && !op.recursive(path)
					return
				readDirLoop(path)
		})
		
	function filter(path, isDir)
		let rs = false
		if filterType === null
			rs = true
		else if filterType === 'none'
			rs = false
		else if filterType === 'file'
			if !isDir
				rs = true
		else if filterType === 'dir'
			if isDir
				rs = true
		else if filterType === 'f'
			if op.filter(path)
				rs = true
		else if path.slice(-op.filter.length) === op.filter
			rs =  true
		return rs