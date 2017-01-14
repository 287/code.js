function getUrlParam(key, url){
	var param = (url != null ? url : location.href).match(new RegExp('(\\?|&)' + key + '=([^&]*)'));
	param = param ? param[2] : '';
	return param;
}