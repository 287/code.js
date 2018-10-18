//#!py
/**
 * @include isObject isFunction getAjax eachObject
 * @param {string} url
 * @param {object} [op]
 * @param {function} cb
 * @return {object}
 */
function getByAjax(url, op, cb)
	if isObject(url)
		cb = op
		op = url
		url = null
	else if isFunction(op)
		cb = op
		op = null
	
	const xhr = getAjax()
	
	op = Object.assign({
		url,
		method: 'get',
		type: 'plain',
		data: null,
		headers: null,
		beforeSend: null,
	}, op)
	
	xhr.open(op.method.toUpperCase(), op.url)
	
	xhr.onreadystatechange = function()
		if xhr.readyState === 4
			let err = null, rs
			if xhr.status === 200
				rs = xhr.responseText
				
				if op.type === 'json'
					rs = JSON.parse(rs)
			else
				err = 'ajax error'
			
			cb(err, rs, xhr, op)
			
	if op.headers
		eachObject(op.headers, (value, key)=> xhr.setRequestHeader(key, value))

	if op.beforeSend
		op.beforeSend(op, xhr)
	
	setTimeout(()=> xhr.send(op.data))
	
	return xhr