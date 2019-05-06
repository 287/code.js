//#!py
/**
 * @include isFunction
 */
function parseArrayWithGroupBy(arr, key)
	const rs = {}
	const isKeyMode = !isFunction(key)
	for arr as item, i
		const groupKey = isKeyMode ? item[key] : key(item, i)
		rs[groupKey] = rs[groupKey] || []
		rs[groupKey].push(item)
		
	return rs