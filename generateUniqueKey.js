//#!py
/**
 * @include random toNumber62 reverseString
 * @param {number} len
 * @return {string}
 */
function generateUniqueKey(len = 16, s = Date.now())
	let key = reverseString(toNumber62(s, 61))
	if key.length < len
		key += 'Z'
	else
		key = key.slice(0, len)
	for len - key.length as i
		key += toNumber62(random(62))
	return key