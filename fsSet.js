/**
 * @include pipeAsync, fsMkdirname
 * @require fs
 * @param {string} path
 * @return {undefined}
 */
function fsSet(path, content, cb){
	pipeAsync(
		(next)=> fsMkdirname(path, next),
		(next)=> fs.writeFile(path, content, next),
		cb
	);
}