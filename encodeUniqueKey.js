//#!py
/**
 * @include generateUniqueKey generateRCodeByString index2char
 */
function encodeUniqueKey(len = 16, s)
	let key = generateUniqueKey(len - 1, s)
	key += index2char(generateRCodeByString(key, 62))
	return key