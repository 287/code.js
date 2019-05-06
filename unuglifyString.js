//#!py
/**
 * @include generateRCodeByString
 */
function unuglifyString(str)
	if generateRCodeByString(str.slice(0, -1)) === parseInt(str.slice(-1), 36)
		const index = parseInt(str.charAt(0), 36)
		let i = 0
		str = str.slice(1, -1).replace(/./g, (t)=> String.fromCharCode(t.charCodeAt(0) - index - (i++ % 11)))
		return str