//#!py
/**
 * @require fs
 * @param {string} path
 * @param {function} cb
 * @return {undefined}
 */
function statAsync(path, cb)
	fs.stat(path, cb)