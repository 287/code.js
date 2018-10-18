/**
 * @require fs
 * @include mkdirname
 * @param {string} path
 * @return {undefined}
 */
function writeFile(path, content){
	mkdirname(path);
	fs.writeFileSync(path, content);
}