//#!py
/**
 * @require fs
 * @param {string} path
 * @return {boolean}
 */
function isDir(path)
	return fs.statSync(path).isDirectory()