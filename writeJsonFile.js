/**
 * @require fs
 * @include mkdirname
 * @param {string} path
 * @return {undefined}
 */
function writeJsonFile(path, content){
	mkdirname(path);
	content = JSON.stringify(content);
	fs.writeFileSync(path, content);
}