//#!py
/**
 * @include splitDataUrl
 */
function dataUrl2blob(dataUrl)
	let {contentType: type, data} = splitDataUrl(dataUrl)
	data = atob(data)
	const aBuffer = new ArrayBuffer(data.length)
	const uBuffer = new Uint8Array(aBuffer)
	for let i = 0; i < data.length; i++
		uBuffer[i] = data.charCodeAt(i) & 0xff
	const blob = new Blob([uBuffer], {type})
	return blob