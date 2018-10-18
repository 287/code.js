//#!py
/**
 * @require fs
 * @param {string} path
 * @return {boolean}
 */
function isExistsAsync(path, cb)
	fs.access(path, cb)