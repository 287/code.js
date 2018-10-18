//#!py
/**
 * @include pipeAsync mkdirnameAsync
 * @require fs
 * @param {string} path
 * @param {string} newPath
 * @param {function} cb
 */
function copyFileAsync(path, newPath, cb)
	pipeAsync(
		(next)=> fs.copyFile(path, newPath, (err)=>{
			if err
				if err.code === 'ENOENT'
					err = null
			else
				err = false
			next(err)
		}),
		(next)=> mkdirnameAsync(newPath, next),
		(next)=> fs.copyFile(path, newPath, next),
		cb
	)