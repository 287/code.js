/**
 * @param {string} path
 * @return {string}
 */
function getDirname(path){
	let sep = '/';
	let i = path.lastIndexOf(sep);
	if(i === -1){
		sep = '\\';
		i = path.lastIndexOf(sep);
	}
	if(i === 0){
		i = -1;
	}else if(i === path.length - 1){
		i = path.lastIndexOf(sep, path.length - 2);
	}
	path = path.slice(0, i + 1);
	return path;
}