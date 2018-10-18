function isClosedPath(path){
	return path.length > 1 && path[0][0] === path[path.length - 1][0] && path[0][1] === path[path.length - 1][1];
}