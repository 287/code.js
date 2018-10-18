//#!py
/**
 * @require fs
 * @param {string} path
 * @return {boolean}
 */
function isExists(path)
	return fs.existsSync(path)