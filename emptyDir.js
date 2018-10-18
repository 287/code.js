//#!py
/**
 * @require fs
 * @include toUnixPath
 * @param {string} dir
 * @return {undefined}
 */
function emptyDir(dir)
	dir = toUnixPath(dir, 1)
	
	let dirs = []
	
	emptyDirLoop(dir)
	
	for let i = 0, l = dirs.length; i < l; i++
		fs.rmdirSync(dirs[l - i - 1])
	
	function emptyDirLoop(dir)
		let list = fs.readdirSync(dir)
		
		list.forEach((path)=>{
			path = dir + path
			
			let stats = fs.statSync(path)
			
			if stats.isDirectory()
				path += '/'
				dirs.push(path)
				emptyDirLoop(path)
			else
				fs.unlinkSync(path)
		})