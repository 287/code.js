/**
 * @include addUrlParam, randomNumber
 * @param {string} url
 * @param {function} cb - cb(err, rs)
 */
function jsonpGet(url, cb){
	var key = 'jsonpcb_' + randomNumber();
	url = addUrlParam(url, 'callback', key);
	window[key] = function(rs){
		runcb(null, rs);
	};
	var node = document.createElement('script');
	node.src = url;
	node.onerror = node.onabort = runcb;
	(document.head || document.body).appendChild(node);
	
	return key;
	
	function runcb(err, rs){
		delete window[key];
		typeof cb === 'function' && cb(err, rs);
	}
}