//#!py
/**
 * @include reverseString
 * @param {number} len
 * @return {string}
 */
function generateKey(len = 16, s = Date.now())
	let key = reverseString(s.toString(35))
	if key.length < len
		key += 'z'
	else
		key = key.slice(0, len)
	for len - key.length as i
		key += Math.floor(Math.random() * 35).toString(36)
	return key