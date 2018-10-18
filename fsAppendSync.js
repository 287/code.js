/**
 * @include fsMkdirnameSync
 * @require fs
 * @param {string} path
 * @return {undefined}
 */
function fsAppendSync(path, content){
	fsMkdirnameSync(path);
	fs.appendFileSync(path, content);
}