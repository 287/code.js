//#!py
function splitDataUrl(dataUrl)
	// data:image/png;base64,xxxxx
	let lastIndex
	let rs = {}
	let keys = ['contentType', 'encodeType', 'data']
	[':', ';', ','].forEach((chr, i, chrs)=> {
		let index = dataUrl.indexOf(chr, lastIndex)
		if lastIndex != null
			rs[keys[i - 1]] = dataUrl.slice(lastIndex, index)
		lastIndex = index + chr.length
		if i === chrs.length - 1
			rs[keys[i]] = dataUrl.slice(lastIndex)
	})
	
	return rs