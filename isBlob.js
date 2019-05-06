//#!py
/**
 * @include getConstructorName
 */
function isBlob(o)
	return getConstructorName(o) === 'Blob'