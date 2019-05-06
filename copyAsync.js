//#!py
/**
 * @desc copy file or dir
 * @include pipeAsync isDirAsync copyFileAsync copyDirAsync
 * @param {string} path
 * @param {string} newPath
 * @param {function} cb({error|null} err, {boolean} rs)
 */
function copyAsync(path, newPath, cb)
	pipeAsync(
		(next)=> isDirAsync(path, next),
		(next, isDir)=> (isDir ? copyDirAsync : copyFileAsync)(path, newPath, next),
		cb
	)