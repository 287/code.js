/**
 * split cookie string to object
 * @param {string} str
 * @return {object}
 */
function splitCookie(str){
	var rs = {};
	var i;
	str.split('; ').forEach(function(item){
		if((i = item.indexOf('=')) > -1){
			rs[item.slice(0, i)] = item.slice(i + 1);
		}
	});
	return rs;
}