//#!py
/**
 * @include generateRCodeByString index2char fromNumber62 reverseString
 */
function decodeUniqueKey(key)
	let s
	if index2char(generateRCodeByString(key.slice(0, -1), 62)) === key.slice(-1)
		s = fromNumber62(reverseString(key.slice(0, key.indexOf('Z'))), 61)
	return s