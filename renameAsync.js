/**
 * @include pipeAsync mkdirnameAsync
 * @require fs
 * @param {string} path
 * @param {string} newPath
 * @param {function} cb
 */
function renameAsync(path, newPath, cb){
	pipeAsync(
		(next)=> mkdirnameAsync(newPath, next),
		(next)=> fs.rename(path, newPath, next),
		cb
	);
}