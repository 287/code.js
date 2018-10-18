/**
 * @include mkdirname
 * @require fs
 * @param {string} path
 * @param {string} newPath
 * @param {function} cb
 */
function rename(path, newPath, cb){
	mkdirname(newPath);
	fs.renameSync(path, newPath);
}