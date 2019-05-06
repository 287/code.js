//#!py
/**
 * @include pipe uglifyString encodeBase64
 */
function encodeTokenString(obj)
	return pipe(obj, JSON.stringify, uglifyString, encodeBase64)