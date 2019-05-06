//#!py
/**
 * @include pipe
 */
function decodeBase64(content)
	if typeof Buffer === 'function'
		return Buffer.from(content, 'base64').toString()
	else
		return pipe(content, atob, escape, decodeURIComponent)