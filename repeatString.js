/**
 * @param {number} len
 * @param {string} [chr = ' ']
 * @return {string}
 */
function repeatString(len, chr){
	var str = '';
	chr = chr == null ? ' ' : chr;
	for(var i = 0; i < len; i++){
		str += chr;
	}
	return str;
}