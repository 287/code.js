/**
 * @require fs
 * @param {string} path
 * @return {undefined}
 */
function fsStat(path, cb){
	fs.stat(path, cb);
}