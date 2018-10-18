//#!py
/**
 * @param {object} o
 * @return {boolean}
 */
function isEmptyObject(o)
	for let key in o
		if o.hasOwnProperty(key)
			return false
	return true