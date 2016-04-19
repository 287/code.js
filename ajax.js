var ajax = function(o){
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
	, sendData = null
	, op = {
		xhr: xhr
		, url: null
		, data: null
		, method: null		//[get|post|put|delete]
		, dataType: null	//[origin|json]
		, contentType: ''	//[form|json]
		, async: true
		, header: null
		, callback: null
		, beforeSend: null
	}
	;
	
	//@ parse option
	for(var k in o) op[k] = o[k];
	op.method = (op.method || op.type || 'get').toLowerCase();
	op.header = op.header || {};
	
	//@ parse send data
	if(typeof op.data=='object'){
		if(op.contentType=='json'){
			sendData = JSON.stringify(op.data);
		}else{
			sendData = [];
			for(var k in op.data){
				sendData.push(k +'='+ encodeURIComponent(op.data[k]));
			}
			sendData = sendData.join('&');
		}
	}
	
	//@ parse header
	if(['post', 'put'].indexOf(op.method)>-1){
		op.header['Content-Type'] = 'application/'+ (op.contentType=='json' ? 'json' : 'x-www-form-urlencoded');
	}
	
	//@ bind beforeSend
	if(typeof op.beforeSend=='function'){
		if(op.callback.call(op, op)===false){
			return false;
		}
	}

	//@ bind callback
	xhr.onreadystatechange = function(){
		if(typeof op.callback=='function'){
			if(xhr.readyState==4){
				var rs = false
				if(xhr.status==200){
					rs = op.result = xhr.responseText;
				}
				if(op.dataType=='json'){
					try{
						rs = JSON.parse(rs)
					}catch(e){}
				}
				op.callback.call(op, rs);
			}
		}
	};
	
	//@ bind callback
	xhr.open(op.method.toUpperCase(), op.url, op.async);
	
	//@ set header
	if(typeof op.header=='object'){
		for(var k in op.header) xhr.setRequestHeader(k, op.header[k]);
	}
	
	//@ send
	xhr.send(sendData);
};