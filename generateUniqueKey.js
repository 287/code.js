//#!py
/**
 * @include toNumber62
 * @param {number} len
 * @return {string}
 */
function generateUniqueKey(len = 12)
	let key = toNumber62(Date.now(), 61).split('').reverse().join('') + 'Z'
	for let i = 0, l = len - key.length; i < l; i++
		key += toNumber62(Math.round(Math.random() * 61))
	return key