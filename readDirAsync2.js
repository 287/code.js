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
	const list = []
	
	// 无序-速度略快方案
	eachAsync(
		[''],
		(next, dir, i, dirs)=> pipeAsync(
			(next)=> fs.readdir(baseDir + dir, next),
			(next, files)=> console.log(files.length)||eachAsync(
				files,
				(next, path, i)=> {
					console.log(i)
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
							rs = op.withStat ? [rs, stat] : rs
						else
							rs = null
						
						if isDir && op.recursive
							if isFunction(op.recursive) && !op.recursive(path)
								return next(null, rs)
							dirs.push(path)
							
						next(null, rs)
					})
				},
				30,
				(err, rs)=>{
					console.log(rs.length)
					if !err
						list.push(...rs.filter(v=> v !== null))
					next(err)
				}
			),
			next
		),
		(err)=> cb(err, err || list)
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

/**
 * @require fs
 * @include writeJsonFile
 */
readDirAsync('d:/server/', {relative: !false, recursive: true, withStat: true}, (err, rs)=>{
	if rs
		writeJsonFile('c:/t.json', rs)
	console.log(err, rs.length)
})