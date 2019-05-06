//#!py
/**
 * @include random generateRCodeByString
 */
function uglifyString(str)
	const index = random(36)
	let i = 0
	str = index.toString(36) + str.replace(/./g, (t)=> String.fromCharCode(t.charCodeAt(0) + index + (i++ % 11)))
	str += generateRCodeByString(str).toString(36)
	return str