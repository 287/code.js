//#!py
/**
 * @param {object} o
 * @param {string} key
 * @param {string} newKey
 * @return {undefined}
 */
function renameObjectKey(o, key, newKey)
	if o[key] !== undefined
		o[newKey] = o[key]
		delete o[key]