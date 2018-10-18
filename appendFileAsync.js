//#!py
/**
 * @require fs
 * @include pipeAsync mkdirnameAsync
 * @param {string} path
 * @param {any} content
 * @param {function} cb
 */
function appendFileAsync(path, content, cb)
	pipeAsync(
		(next)=> fs.appendFile(path, content, (err)=>{
			if err
				if err.code === 'ENOENT'
					err = null
			else
				err = false
			next(err)
		}),
		(next)=> mkdirnameAsync(path, next),
		(next)=> fs.appendFile(path, content, next),
		cb
	)