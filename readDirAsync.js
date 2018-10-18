//#!py
/**
 * @require fs
 * @include isObject isFunction isString toUnixPath eachAsync pipeAsync
 * @param {string} dir
 * @param {object} [op]
 * @param {boolean} [op.relative = true]
 * @param {boolean} [op.withStat = false]
 * @param {boolean} [op.recursive = false]
 * @param {string|function} [op.filter = null]
 * @return {array}
 */
function readDirAsync(dir, op, cb)
	if isFunction(op)
		cb = op
		op = null
		
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
	
	// 有序-速度略慢方案
	readDirLoop('', cb)
	
	function readDirLoop(dir, next)
		pipeAsync(
			(next)=> fs.readdir(baseDir + dir, next),
			(next, files)=> eachAsync(
				files,
				(next, path)=> {
					path = dir + path
					fs.stat(baseDir + path, (err, stats)=> {
						if err
							return next(err)
						let isDir = stats.isDirectory()
						if isDir
							path += '/'
							
						let rs = path
						if !op.relative
							rs = baseDir + path
									
						if filterType === null || filter(path, isDir)
							rs = op.withStat ? [rs, stats] : rs
						else
							rs = null
						
						rs = [rs]
						
						let recursive = false
						if isDir && op.recursive
							recursive = true
							if isFunction(op.recursive) && !op.recursive(path)
								recursive = false
								
						if recursive
							readDirLoop(path, (err, list)=>{
								if !err
									rs.push(...list)
								next(err, rs)
							})
						else
							next(null, rs)
					})
				},
				30,
				(err, rs)=>{
					if !err
						rs = [].concat(...rs).filter(v=> v !== null)
					next(err, rs)
				}
			),
			(err, rs)=>{
				if dir === ''
					next = cb
				next(err, rs)
			}
		)
		
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