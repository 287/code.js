/**
 * @include pipeAsync, fsMkdirname
 * @require fs
 * @param {string} path
 * @param {string} newPath
 * @param {function} cb
 */
function fsRename(path, newPath, cb){
	pipeAsync(
		(next)=> fsMkdirname(newPath, next),
		(next)=> fs.rename(path, newPath, next),
		cb
	);
}