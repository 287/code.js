//#!py
/**
 * copyDir
 * @require fs
 * @include toUnixPath eachAsync pipeAsync
 * @param {string} dir
 * @param {function} cb({error|null} err)
 */
function emptyDirAsync(dir, cb)
	const baseDir = toUnixPath(dir, 1)
	const list = []
	
	pipeAsync(
		(next)=> eachAsync(
			[''],
			(next, dir, i, dirs)=> pipeAsync(
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
								list.push(path)
								next()
							else
								fs.unlink(baseDir + path, next)
						}),
						30,
						(err)=> next(err)
					)
				},
				(err)=> next(err)
			),
			30,
			(err)=> next(err)
		),
		(next)=> eachAsync(
			list.reverse(),
			(next, dir)=> fs.rmdir(baseDir + dir, next),
			next
		),
		(err)=> cb(err)
	)