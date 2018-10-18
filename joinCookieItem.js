/**
 * @include eachObject
 * @param {string} key
 * @param {string} value
 * @param {object} [op]
 * @return {string}
 */
function joinCookieItem(key, value, op){
	op = Object.assign({
		[key]: value
	}, op)
	let list = []
	eachObject(op, (value, key)=> list.push(`${key}=${value}`))
	return list.join('; ')
}