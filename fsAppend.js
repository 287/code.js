/**
 * @include pipeAsync, fsMkdirname
 * @require fs
 * @param {string} path
 * @return {undefined}
 */
function fsAppend(path, content, cb){
	pipeAsync(
		(next)=> fsMkdirname(path, next),
		(next)=> fs.appendFile(path, content, next),
		cb
	);
}