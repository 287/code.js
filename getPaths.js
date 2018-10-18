/**
 * 获取路径的所有父路径 - /a/b/c -> ["/", "/a/", "/a/b/", "/a/b/c/"]
 * @param {string} path
 * @return {array<string>}
 */
function getPaths(path){
	var list = path.split(/\\|\//);
	var paths = [];
	list.forEach((path, i)=>{
		if(i === list.length - 1 && path === '') return ;
		path = list.slice(0, i + 1).join('/') + '/';
		paths.push(path);
	});
	if(paths.length > 0 && !/\\|\//.test(path.slice(-1))){
		paths.push(paths.pop().slice(0, -1));
	}
	return paths;
}