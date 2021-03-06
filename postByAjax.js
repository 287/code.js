//#!py
/**
 * @include isObject isFunction isPureObject object2querystring getByAjax
 * @param {object} op
 * @param {string} op.url
 * @param {string} [op.method = 'post'] - [post|put]
 * @param {string} [op.type = 'json'] - [json|plain] - get data type
 * @param {string} [op.dataType = 'form'] - [form|json] - send data type
 * @param {object} [op.data] - send data
 * @param {object} [op.headers]
 * @param {function} [op.beforeSend]
 * @param {function} cb
 * @return {object}
 */
function postByAjax(url, data, op, cb)
	if isObject(url)
		op = url
		cb = data
		url = null
		data = null
	else if isFunction(op)
		cb = op
		op = null
	
	op = Object.assign({
		url,
		data,
		method: 'post',
		type: 'json',
		dataType: 'form',
		headers: {},
	}, op)
	
	if isPureObject(op.data)
		select op.dataType
			case 'json'
				op.headers['Content-Type'] = 'application/json'
				op.data = JSON.stringify(op.data)
				
			case 'form'
			default
				op.headers['Content-Type'] = 'application/x-www-form-urlencoded'
				op.data = object2querystring(op.data)
				
	return getByAjax(op, cb)