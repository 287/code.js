//#!py
/**
 * @param {object} o
 * @param {string} key
 * @return {any}
 */
function removeObjectValueByKey(o, key)
	const value = o[key]
	delete o[key]
	return value