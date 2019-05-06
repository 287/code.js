//#!py
/**
 * @include random
 */
function randomString(len = 6)
	const arr = []
	for len as i
		arr.push(random(i === 0 && 10 || 0, 36).toString(36))
	return arr.join('')