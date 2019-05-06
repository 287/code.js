//#!py
/**
 * @include object2blob
 */
function createBlobUrl(data, type)
	return URL.createObjectURL(object2blob(data, type))