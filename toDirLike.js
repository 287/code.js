/**
 * 把路径转换成 dir like style
 * @param {string} path
 * @return {string}
 */
function toDirLike(path){
	if(path.slice(-1) !== '/')
		path += '/'
	return path;
}