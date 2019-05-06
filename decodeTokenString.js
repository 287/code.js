//#!py
/**
 * @include pipe decodeBase64 unuglifyString
 */
function decodeTokenString(str)
	let value
	try
		value = pipe(str, decodeBase64, unuglifyString, JSON.parse)
	return value