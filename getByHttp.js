//#!py
/**
 * @include isFunction requestByHttp
 * @require http https
 * @param {string} url
 * @param {object} [op]
 * @param {object} [op.headers]
 * @param {function} cb - cb({error|null} err, {buffer} [content])
 * @return {ClientRequest} req
 */
function getByHttp(url, op, cb)
	if isFunction(op)
		cb = op
		op = null
		
	op = Object.assign({
		url,
		method: 'GET',
	}, op)
	
	return requestByHttp(op, cb)