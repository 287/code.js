/**
 * @include isStringEndsWith
 * @param {string} str
 * @param {array<string>} withStrs
 * @return {boolean} - 只要withStrs中有一个匹配就返回true
 */
function isStringEndsWiths(str, withStrs){
	return withStrs.some((withStr)=> isStringEndsWith(str, withStr));
}