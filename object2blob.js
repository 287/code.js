//#!py
/**
 * @include isBlob isArray
 */
function object2blob(data, type)
	if isBlob(data)
		return data
		
	if !isArray(data)
		data = [data]
		
	return new Blob(data, {type})