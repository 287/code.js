/**
 * @include isArray, isNumber
 * @param {array<...number>} p
 * @return {boolean}
 */
function isPointLike(p){
	return isArray(p) && isNumber(p[0]) && isNumber(p[1]);
}