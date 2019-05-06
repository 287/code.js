//#!py
function emitBlobDownload(blob, filename)
	if blob.constructor !== Blob
		blob = new Blob([blob])
	const a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
	a.href = URL.createObjectURL(blob)
	a.download = filename
	a.click()