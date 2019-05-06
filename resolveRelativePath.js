//#!py
/**
 * @include isAbsolutePath splitPath
 * @param {string} path - relative path
 * @param {string} cwd - current dir
 * @return {string}
 */
function resolveRelativePath(path, cwd)
	if isAbsolutePath(path)
		return path
		
	let dirs = splitPath(cwd, 1)
	let paths = splitPath(path)
	let offset = 0
	
	paths = paths.map((path, i)=> {
		if path === './'
			path = null
		else if path === '../'
			path = null
			if i === 0
				offset--
			else
				if paths[i - 1] === '../'
					offset--
				else
					paths[i - 1] = null
		return path
	}).filter(path=> path !== null)
	
	paths = dirs.slice(0, offset === 0 ? undefined : offset).concat(paths)
		
	return paths.join('')