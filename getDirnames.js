/**
 * get all parents dirname of path
 * eg: /a/b/c -> ["/a/b/", "/a/", "/"]
 * @include getDirname
 * @param {string} path
 * @return {array<string>}
 */
function getDirnames(path){
	let list = [];
	while((path = getDirname(path)) !== ''){
		list.push(path);
	}
	return list;
}