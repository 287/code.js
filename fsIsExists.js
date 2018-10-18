/**
 * @require fs
 * @param {string} path
 * @return {undefined}
 */
function fsIsExists(path, cb){
	fs.access(path, cb);
}