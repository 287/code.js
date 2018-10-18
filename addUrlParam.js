/**
 * @param {string} url
 * @param {string|object} key
 * @param {string} [value]
 * @return {string}
 */
function addUrlParam(url, key, value){
	var i = url.indexOf('?');
	var hasQuery = false;
	var params = {};
	var param = [];
	if(typeof key === 'object'){
		params = key;
	}else{
		params[key] = value;
	}
	for(key in params){
		value = params[key];
		key !== '' && param.push(key + '=' + encodeURIComponent(value));
	}
	if(i > -1){
		if(url.charAt(i + 1) === '/'){
			i = url.indexOf('?', i);
			hasQuery = i === -1;
		}else{
			hasQuery = true;
		}
	}
	if(param.length){
		if((i = url.indexOf('#')) > -1){
			value = url.slice(i);
			url = url.slice(0, i);
		}else{
			value = '';
		}
		url += (hasQuery ? '&' : '?') + param.join('&') + value;
	}
	return url;
}