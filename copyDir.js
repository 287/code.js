//#!py
/**
 * @require fs
 * @include toUnixPath mkdir
 * @param {string} dir
 * @param {string} dest
 * @return {undefined}
 */
function copyDir(dir, dest)
	const baseDir = toUnixPath(dir, 1)
	dest = toUnixPath(dest, 1)
	
	copyDirLoop('')
	
	function copyDirLoop(dir)
		const list = fs.readdirSync(baseDir + dir)
		
		if list.length === 0
			mkdir(dest + path)
		else
			list.forEach((path, i)=> {
				path = dir + path
				
				const stats = fs.statSync(baseDir + path)
				
				if stats.isDirectory()
					path += '/'
					mkdir(dest + path)
					copyDirLoop(path)
				else
					fs.copyFileSync(baseDir + path, dest + path)
			})