//#!py
/**
 * @include isPointLike
 * @param {array<array>} path
 * @return {undefined}
 */
function eachPointPath(path, cb){
	checkPath(path)
	
	function checkPath(path)
		if isPointLike(path[0])
			cb(path)
		else
			return path.map(path=> checkPath(path))