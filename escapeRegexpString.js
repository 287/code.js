/**
 * escape some char of regexp protected
 * @param {string} str
 * @return {string}
 */
function escapeRegexpString(str){
	/*!generator
		var chars = '.*+?[]{}()!=|/\/';
		chars = chars.replace(/(.)/g, '|\\$1').substr(1);
		var escapes = new RegExp('(' + chars + ')', 'g');
	 */
	var escapes = /(\.|\*|\+|\?|\[|\]|\{|\}|\(|\)|\!|\=|\||\/|\/)/g;
	str = str.replace(escapes, '\\$1');
	return str;
}