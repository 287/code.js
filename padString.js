/**
 * @include repeatString
 * @param {string} str
 * @param {number} len
 * @param {string} [chr = ' ']
 * @param {string} [type = 'r'] - [l|r]
 * @return {string}
 */
function padString(str, len, chr, type){
	if(str.length < len){
		var chrs = repeatString(len - str.length, chr);
		str = type === 'l' ? chrs + str : str + chrs;
	}
	return str;
}