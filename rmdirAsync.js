//#!py
/**
 * @require fs
 * @include emptyDirAsync
 * @param {string} dir
 * @param {function} cb({error|null} err)
 */
function rmdirAsync(dir, cb)
	pipeAsync(
		(next)=> emptyDirAsync(dir, (err)=>{
			if err && err.code === 'ENOENT'
				err = false
			next(err)
		}),
		(next)=> fs.rmdir(dir, next),
		(err)=> cb(err)
	)