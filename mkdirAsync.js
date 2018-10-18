//#!py
/**
 * mkdir deep async
 * @require fs
 * @include pipeAsync eachAsync getDirname
 * @param {string} dir
 * @param {function} cb
 * @return {undefined}
 */
function mkdirAsync(dir, cb)
	let dirs = []
	let path = dir
	pipeAsync(
		(next)=> eachAsync(
			100,
			(next, i)=> {
				if path === ''
					return next(false)
					
				fs.stat(path, (err, stat)=>{
					if err
						if err.code === 'ENOENT'
							err = null
							dirs.push(path)
							path = getDirname(path)
					else
						if stat.isDirectory()
							err = false
						else
							err = `mkdirAsync "${dir}" error: "${path}" exists and not a dir`
					next(err)
				})
			},
			next
		),
		(next)=> eachAsync(
			dirs.reverse(),
			(next, path)=> fs.mkdir(path, (err)=> {
				if err && err.code === 'EEXIST'
					err = null
				next(err)
			}),
			next
		),
		cb
	)