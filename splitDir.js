//#!py
/**
 * @alias 
 */
function splitDir(dir)
	if dir.slice(-1) === '/'
		dir = dir.slice(0, -1)
		
	let dirs = dir.split('/').map(dir=> dir += '/')
	
	return dirs