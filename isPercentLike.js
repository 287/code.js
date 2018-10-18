/**
 * @param {string} str
 * @return {boolean}
 */
function isPercentLike(str){
	return /^-?(\d+|\d*\.\d+)%$/.test(str);
}