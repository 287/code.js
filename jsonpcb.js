function jsonpcb(fn){
	var key = 'jsonp_callbak_' + new Date().getTime()
	window[key] = function(rs){
		typeof fn === 'function' && fn(rs);
		delete window[key];
	};
	return key;
}