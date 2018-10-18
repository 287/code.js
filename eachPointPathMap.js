//#!py
/**
 * @include isPointLike
 * @param {array<array>} path
 * @return {undefined}
 */
function eachPointPathMap(path, cb){
	return checkPath(path)
	
	function checkPath(path)
		if isPointLike(path[0])
			return cb(path)
		else
			return path.map(path=> checkPath(path))