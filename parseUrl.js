/**
 * parse url
 * @param {string} url
 * @return {object} url object
 */
function parseUrl(url){
	url = url.indexOf('%') > -1 ? decodeURIComponent(url) : url;;
	var rs = {
		url: url
		, protocol: ''
		, host: ''
		, hostname: ''
		, port: ''
		, path: ''
		, query: ''
		, _path: ''
		, _query: ''
		, _extname: ''
		, hash: ''
		, extname: ''
		, paths: []
		, querys: {}
		, _paths: []
	};
	var extRegexp = /(\/|\.[a-zA-Z0-9_]*)$/;
	var tmp = {};
	
	//* get protocol
	tmp = splitOnce(url, '://');
	if(tmp.length === 2){
		url = tmp[1];
		rs.protocol = tmp[0] === '' ? '' : tmp[0] + ':';
	}
	
	//* get hash
	tmp = splitOnce(url, '#');
	if(tmp.length === 2){
		url = tmp[0];
		rs.hash = '#' + tmp[1];
	}
	
	//* get query
	tmp = splitOnce(url, '?');
	if(tmp.length === 2){
		url = tmp[0];
		rs.query = '?' + tmp[1];
	}
	
	//* get path
	tmp = splitOnce(url, '/');
	if(tmp.length === 2){
		url = tmp[0];
		rs.path = '/' + tmp[1];
	}
	
	//* get port
	tmp = splitOnce(url, ':');
	if(tmp.length === 2){
		url = tmp[0];
		rs.port = tmp[1];
	}
	
	rs.hostname = url;
	if(rs.hostname !== ''){
		rs.host = rs.hostname + (rs.port ? ':' + rs.port : '');
	}
	
	
	//* get _query, _path
	if(rs.query){
		//* get _query
		if(rs.query.charAt(1) === '/'){
			tmp = splitOnce(rs.query.slice(1), '?');
			if(tmp.length === 2){
				rs._path = tmp[0];
				rs._query = tmp[1];
			}else{
				rs._path = rs.query.slice(1);
			}
		}
	}
	
	if(rs.path){
		tmp = rs.path.match(extRegexp);
		if(tmp){
			rs.extname = tmp[0];
		}
		rs.paths = parseUrlPath(rs.extname.length ? rs.path.slice(0, -rs.extname.length) : rs.path);
	}
	
	if(rs._path || rs._query){
		tmp = rs._path.match(extRegexp);
		if(tmp){
			rs._extname = tmp[0];
		}
		rs._paths = parseUrlPath(rs._extname.length ? rs._path.slice(0, -rs._extname.length) : rs._path);
		rs.querys = parseUrlQuery(rs._query);
	}else{
		rs.querys = parseUrlQuery(rs.query);
	}
	
	return rs;
	
	
	function splitOnce(str, s){
		var i = str.indexOf(s);
		var list = [str];
		if(i > -1){
			list[1] = str.slice(i + s.length);
			list[0] = str.slice(0, i);
		}
		return list;
	}
	
	function parseUrlPath(url){
		var rs = [];
		url = url.charAt(0) === '/' ? url.substr(1) : url;
		
		url.split('/').forEach(function(v){
			if(v !== '') rs.push(v);
		});
		
		return rs;
	}

	function parseUrlQuery(url){
		var rs = {};
		var index;
		
		url && url.split('&').forEach(function(key){
			var value = '';
			index = key.indexOf('=');
			if(index > -1){
				value = key.substr(index + 1);
				key = key.substr(0, index);
			}
			key = key.replace(/^s+|\s+$/g, '');
			if(key){
				rs[key] = value;
			}
		});
		
		return rs;
	}
}