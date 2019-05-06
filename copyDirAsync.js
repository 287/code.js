//#!py
/**
 * copyDir
 * @require fs
 * @include toUnixPath eachAsync pipeAsync mkdirAsync
 * @param {string} path
 * @param {string} newPath
 * @param {function} cb({error|null} err, {boolean} rs)
 */
function copyDirAsync(dir, dest, cb)
	const baseDir = toUnixPath(dir, 1)
	dest = toUnixPath(dest, 1)
	
	eachAsync(
		[''],
		(next, dir, i, dirs)=> pipeAsync(
			(next)=> mkdirAsync(dest + dir, next),
			(next)=> fs.readdir(baseDir + dir, next),
			(next, files)=> {
				eachAsync(
					files,
					(next, path)=> fs.stat(baseDir + dir + path, (err, stats)=> {
						if err
							return next(err)
							
						path = dir + path
						if stats.isDirectory()
							path += '/'
							dirs.push(path)
							next()
						else
							fs.copyFile(baseDir + path, dest + path, next)
					}),
					30,
					(err)=> next(err)
				)
			},
			(err)=> next(err)
		),
		30,
		(err)=> cb(err)
	)