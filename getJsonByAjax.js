//#!py
/**
 * @include isFunction requestByAjax
 * @param {string} url
 * @param {object} [op]
 * @param {string} [op.type = 'json']
 * @param {function} cb
 * @return {object}
 */
function getJsonByAjax(url, op, cb)
	if isFunction(op)
		cb = op
		op = null
	
	op = Object.assign({
		url,
		type: 'json',
	}, op)
	
	return requestByAjax(op, cb)