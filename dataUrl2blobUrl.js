//#!py
/**
 * @include dataUrl2blob
 */
function dataUrl2blobUrl(dataUrl)
	return URL.createObjectURL(dataUrl2blob(dataUrl))