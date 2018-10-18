/**
 * split url
 * @include splitOnce, splitUrlPath, isEmpty
 * @param {string} path
 * @return {object}
 */
function splitUrl(url){
	var rs = {};
	var tmp;
	
	tmp = splitOnce(url, '//');
	if(tmp.length > 1){
		rs.protocol = tmp[0];
		url = tmp[1];
	
		tmp = splitOnce(url, '/');
		if(tmp.length > 1){
			rs.host = tmp[0];
			url = '/' + tmp[1];
		}
	}
	
	tmp = splitOnce(url, '@');
	if(tmp.length > 1){
		rs.auth = tmp[0];
		url = tmp[1];
	}
	
	tmp = splitOnce(url, '#');
	if(tmp.length > 1){
		url = tmp[0];
		rs.hash = '#' + tmp[1];
	}
	
	rs.path = url;
	
	if(!isEmpty(rs.path)){
		tmp = splitUrlPath(rs.path);
		Object.assign(rs, tmp);
	}
	
	if(!isEmpty(rs.auth)){
		tmp = splitOnce(rs.auth, ':');
		if(tmp.length > -1){
			rs.username = tmp[0];
			rs.password = tmp[1];
		}else{
			rs.username = tmp[0];
		}
	}
	
	if(!isEmpty(rs.host)){
		tmp = splitOnce(rs.host, ':');
		if(tmp.length > -1){
			rs.hostname = tmp[0];
			rs.port = tmp[1] || '';
		}else{
			rs.hostname = tmp[0];
		}
	}
	
	return rs;
}