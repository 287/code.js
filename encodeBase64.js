//#!py
/**
 * @include pipe
 */
function encodeBase64(content)
	if typeof Buffer === 'function'
		return Buffer.from(content).toString('base64')
	else
		return pipe(content, encodeURIComponent, unescape, btoa)