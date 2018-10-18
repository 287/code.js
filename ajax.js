/**
 * @include object2querystring, eachObject, apply
 * @param {object} op
 * @param {string} op.url
 * @param {string} [op.method = 'get'] - [get|post]
 * @param {string} [op.dataType = 'plain'] - [plain|json] - response data type
 * @param {object} [op.data] - request data
 * @param {string} [op.postType = 'text'] - [form|json] - request data type
 * @param {object} [op.headers]
 * @param {function} [op.beforeSend]
 * @param {function} cb
 * @return {object}
 */
function ajax(op, cb){
	const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	op = Object.assign({
		xhr,
		method: 'get',
		dataType: 'plain',
		postType: 'form',
		headers: {},
	}, op);
	op.method = op.method.toLowerCase();
	let postData;

	// apply data
	if(op.data){
		if(op.method === 'get'){
			op.url += object2querystring(op.data);
		}else{
			switch(op.postType){
				case 'json':
					postData = JSON.stringify(op.data);
					op.headers['Content-Type'] = 'application/json';
				break; case 'form': case null:
					postData = object2querystring(op.data);
					op.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			}
		}
	}
	
	xhr.onreadystatechange = function(){
		var rs = null, err = null;
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				rs = xhr.responseText;
			}else{
				err = 'ajax load error';
			}
			if(op.dataType === 'json'){
				try{
					rs = JSON.parse(rs);
				}catch(err){
					err = err;
				}
			}
			apply(cb, [err, rs]);
		}
	};
	
	xhr.open(op.method.toUpperCase(), op.url);
	
	// apply headers
	eachObject(op.headers, (value, key)=> xhr.setRequestHeader(key, value));

	apply(op.beforeSend, [op]);
	
	setTimeout(()=> xhr.send(postData));
	
	return op;
}


ajax.get = function(url, op, cb){
	if(isFunction(op)){
		cb = op;
		op = null;
	}
 	return ajax(Object.assign({
		url,
	}, op), cb);
};

ajax.getJson = function(url, op, cb){
	if(isFunction(op)){
		cb = op;
		op = null;
	}
 	return ajax(Object.assign({
		url,
		dataType: 'json',
	}, op), cb);
};

ajax.post = function(url, data, op, cb){
	if(isFunction(op)){
		cb = op;
		op = null;
	}
 	return ajax(Object.assign({
		method: 'post',
		dataType: 'json',
		postType: 'form',
		url,
		data,
	}, op), cb);
};