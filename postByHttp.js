//#!py
/**
 * @include isFunction isObject isBuffer object2querystring requestByHttp
 * @require http https
 * @param {string} url
 * @param {object} [op]
 * @param {object} [op.headers]
 * @param {function} cb - cb({error|null} err, {buffer} [content])
 * @return {ClientRequest} req
 */
function postByHttp(url, data, op, cb)
	if isFunction(op)
		cb = op
		op = null
		
	op = Object.assign({
		url,
		data,
		method: 'POST',
		headers: {},
	}, op)
	
	if isObject(op.data) && !isBuffer(op.data)
		op.data = object2querystring(op.data)
		op.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		
	op.headers['Content-Length'] = data.length
	
	return requestByHttp(op, cb)