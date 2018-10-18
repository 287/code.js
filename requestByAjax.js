//#!py
/**
 * @include postByAjax getByAjax
 * @param {object} op
 * @param {string} op.url
 * @param {string} [op.method = 'get'] - [get|post]
 * @param {string} [op.type = 'plain'] - [plain|json] - response data type
 * @param {object} [op.data] - xhr send data
 * @param {object} [op.headers]
 * @param {function} [op.beforeSend]
 * @param {function} cb
 * @return {undefined}
 */
function requestByAjax(op, cb)
	if op.data
		return postByAjax(op, cb)
	else
		return getByAjax(op, cb)