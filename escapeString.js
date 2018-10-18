/**
 * escape some char of regexp protected
 * @param {string} str
 * @param {object} str
 * @return {string}
 */
function escapeString(str, o){
	var keys = [];
	Object.keys(o).forEach(function(key){
		keys.push(key);
	});
	var escapes = new RegExp('(' + keys.join('|') + ')', 'g');
	str = str.replace(escapes, function(t, m){
		return o[m] || m; 
	});
	return str;
}