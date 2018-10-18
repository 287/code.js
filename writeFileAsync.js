//#!py
/**
 * @require fs
 * @include pipeAsync mkdirnameAsync
 * @param {string} path
 * @param {any} content
 * @param {function} cb
 */
function writeFileAsync(path, content, cb)
	pipeAsync(
		(next)=> fs.writeFile(path, content, (err)=>{
			if err
				if err.code === 'ENOENT'
					err = null
			else
				err = false
			next(err)
		}),
		(next)=> mkdirnameAsync(path, next),
		(next)=> fs.writeFile(path, content, next),
		cb
	)