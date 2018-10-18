/**
 * @require fs
 * @param {string} path
 * @return {boolean}
 */
function fsIsDirSync(path){
	var stat = fs.statSync(path);
	return stat.isDirectory();
}