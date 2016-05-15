function ajax(o){
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
	, sendData = null
	, op = {
		xhr: xhr
		, url: null
		, data: null //[get|post|put|delete]
		, method: null //[origin|json]
		, dataType: null //[form|json]
		, contentType: ''
		, async: true
		, header: null
		, callback: null
		, beforeSend: null
	}
	, k
	;

	//* parse option
	for(k in o){
		op[k] = o[k];
	}
	op.method = (op.method || op.type || 'get').toLowerCase();
	op.header = op.header || {};

	//* parse send data
	if(op.data && typeof op.data === 'object'){
		if(op.contentType === 'json'){
			sendData = JSON.stringify(op.data);
		}else{
			sendData = [];
			for(k in op.data){
				sendData.push(k + '=' + encodeURIComponent(op.data[k]));
			}
			sendData = sendData.join('&');
		}
	}

	//* parse header
	if(['post', 'put'].indexOf(op.method) > -1){
		op.header['Content-Type'] = 'application/' + (op.contentType == 'json' ? 'json' : 'x-www-form-urlencoded');
	}

	//* bind callback
	xhr.onreadystatechange = function (){
		var rs = false;
		if(typeof op.callback === 'function' && xhr.readyState === 4){
			if(xhr.status === 200){
				rs = op.result = xhr.responseText;
				if(op.dataType === 'json'){
					rs = JSON.parse(rs);
				}
			}
			op.callback(rs);
		}
	};
	
	//* open before set header
	xhr.open(op.method.toUpperCase(), op.url, op.async);
	
	//* set header
	for(k in op.header){
		xhr.setRequestHeader(k, op.header[k]);
	}

	//* bind beforeSend
	if(typeof op.beforeSend === 'function'){
		if(op.beforeSend(op) === false){
			return false;
		}
	}

	//* send
	xhr.send(sendData);
}
