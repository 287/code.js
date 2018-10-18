//#!py
/**
 * @require fs
 * @param {string} path
 * @return {boolean}
 */
function isFile(path)
	return fs.statSync(path).isFile()