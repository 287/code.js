//#!py
/**
 * @include isObject isPureObject
 * @param {object|string} obj
 * @param {any} [value]
 * @return {object}
 */
function toObject(obj, value)
	if isObject(obj)
		if !isPureObject(obj)
			obj = Object.assign({}, obj)
	else
		obj = {[obj]: value}
	
	return obj