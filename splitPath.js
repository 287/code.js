//#!py
/**
 * @alias 
 */
function splitPath(path, isDir)
	if path === ''
		return ['']
		
	let lastChr = isDir ? '/' : ''
	if path.slice(-1) === '/'
		lastChr = '/'
		path = path.slice(0, -1)
		
	return path.split('/').map((item, i, list)=> item += i === list.length - 1 ? lastChr : '/')