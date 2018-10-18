/**
 * @require fs
 * @include writeFileAsync
 * @param {string} path
 * @param {any} content
 * @param {function} cb
 */
function writeJsonFileAsync(path, content, cb){
	writeFileAsync(path, JSON.stringify(content), cb);
}