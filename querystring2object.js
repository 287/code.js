/**
 * @param {string} str
 * @return {object}
 */
function querystring2object(str){
	var rs = {};
	var index;
	str.split('&').forEach(function(item){
		index = item.indexOf('=');
		if(index > -1){
			rs[item.slice(0, index)] = decodeURIComponent(item.slice(index + 1));
		}
	});
	return rs;
}