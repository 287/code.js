/**
 * @param {string} str
 * @return {boolean}
 */
function isNumberLike(str){
	return /^-?(\d+|\d*\.\d+)$/.test(str);
}