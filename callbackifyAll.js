//#!py
/**
 * @include eachObject isFunction callbackify
 * @param {object} o
 * @param {boolean} [isCover = false]
 * @return {object}
 */
function callbackifyAll(o, isCover)
	const aliasKey = isCover ? '' : 'Async'
	
	eachObject(o, (value, key)=> {
		if isFunction(value)
			o[key + aliasKey] = callbackify(value)
	})
	
	return o