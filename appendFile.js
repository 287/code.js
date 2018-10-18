/**
 * @require fs
 * @include mkdirname
 * @param {string} path
 * @return {undefined}
 */
function appendFile(path, content){
	mkdirname(path);
	fs.appendFileSync(path, content);
}