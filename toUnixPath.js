/**
 * 把路径转换成unix like style
 * @param {string} path
 * @param {~boolean} [isDir = false]
 * @return {string}
 */
function toUnixPath(path, isDir){
	path = path.replace(/\\/g, '/');
	if(isDir && path.length > 0){
		path += path.slice(-1) === '/' ? '' : '/';
	}
	return path;
}