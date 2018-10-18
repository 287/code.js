//#!py
/**
 * @require fs
 * @include isDirAsync rmdirAsync
 * @param {string} path
 * @param {function} cb({error|null} err)
 */
function rmAsync(path, cb)
	pipeAsync(
		(next)=> isDirAsync(path, (err, isDir)=>{
			if err
				if err.code === 'ENOENT'
					err = false
				return next(err)
				
			if isDir
				rmdirAsync(path, next)
			else
				fs.unlink(path, next)				
		}),
		(err)=> cb(err)
	)