//#!py
function readFileAsDataUrl(file, cb)
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = ()=> cb(null, reader.result)
	reader.onerror = cb
	return reader