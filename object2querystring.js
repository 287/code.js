/**
 * @param {object} object
 * @return {string}
 */
function object2querystring(object){
	var list = [];
	var rs = '';
	var key, value;
	if(object && typeof object === 'object'){
		for(key in object){
			if(object.hasOwnProperty(key)){
				value = object[key];
				value = typeof value === 'object' ? JSON.stringify(value) : value;
				list.push(key + '=' + encodeURIComponent(value));
			}
		}
		rs = list.join('&');
	}
	return rs;
}