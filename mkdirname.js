/**
 * mkdirname deep sync
 * @include getDirname mkdir
 * @param {string} path
 * @return {boolean}
 */
function mkdirname(path){
	return mkdir(getDirname(path));
}