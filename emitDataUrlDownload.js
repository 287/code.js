//#!py
function emitDataUrlDownload(dataUrl, filename)
	dataUrl = dataUrl.replace(/\/[a-z]{3,4};/, '/octet-stream;')
	const a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
	a.href = dataUrl
	a.download = filename
	a.click()