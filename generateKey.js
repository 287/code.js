//#!py
/**
 * @param {number} len
 * @return {string}
 */
function generateKey(len = 12)
	let key = Date.now().toString(34).split('').reverse().join('') + 'z'
	for let i = 0, l = len - key.length; i < l; i++
		key += Math.round(Math.random() * 35).toString(36)
	return key