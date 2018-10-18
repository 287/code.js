//#!py
/**
 * @include isExists isDir isFile toUnixPath
 */
function getFilePathFromPathByFileName(path, name)
	if isExists(path)
		if isDir(path)
			path = toUnixPath(path, true) + name
		if isFile(path)
			return path