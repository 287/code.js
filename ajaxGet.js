function ajaxGet(url, fn){
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
	;
	xhr.onreadystatechange = function (){
		var rs = false;
		if(typeof fn === 'function' && xhr.readyState === 4){
			if(xhr.status === 200){
				rs = op.result = xhr.responseText;
			}
			callback(rs);
		}
	};
	xhr.onerror = function(){
		callback(false);
	};
	
	xhr.open('GET', url, true);
	xhr.send(sendData);
	
	function callback(rs){
		typeof fn === 'function' && fn.call(xhr, rs);
	}
}
