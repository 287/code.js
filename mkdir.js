//#!py
/**
 * mkdir deep sync
 * @require fs
 * @include getDirname
 * @param {string} dir
 * @return {undefined}
 */
function mkdir(dir)
	let dirs = []
	let path = dir
	let i = 0
	
	while i < 100 && path !== ''
		try
			if fs.statSync(path).isDirectory()
				break
			else
				throw new Error(`mkdir "${dir}" error: "${path}" exists and not a dir`)
		catch err
			if err.code === 'ENOENT'
				dirs.push(path)
				path = getDirname(path)
			else
				throw err
			
	if dirs.length
		dirs.reverse().forEach((path)=> fs.mkdirSync(path))