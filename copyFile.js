/**
 * @require fs
 * @include mkdirname
 * @param {string} path
 * @return {undefined}
 */
function copyFile(path, dest){
	mkdirname(dest);
	fs.copyFileSync(path, dest);
}