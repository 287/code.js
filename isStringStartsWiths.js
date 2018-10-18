/**
 * @include isStringStartsWith
 * @param {string} str
 * @param {array<string>} withStrs
 * @return {boolean} - 只要withStrs中有一个匹配就返回true
 */
function isStringStartsWiths(str, withStrs){
	return withStrs.some((withStr)=> isStringStartsWith(str, withStr));
}