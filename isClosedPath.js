//#!py
function isClosedPath(path)
	return path.length > 1 && path[0].every((v, i)=> path[path.length - 1][i] === v)