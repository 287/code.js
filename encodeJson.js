//#!py
/**
 * @include isRegExp
 */
function encodeJson(obj)
	return JSON.stringify(obj, (key, value)=> {
		if isRegExp(value)
			value = value.toString()
		return value
	})