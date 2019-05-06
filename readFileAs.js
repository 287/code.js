//#!py
function readFileAs(file, type = 'dataURL', cb)
	let readType = type
	if readType === 'blob'
		readType = 'ArrayBuffer'
	else
		readType = readType.replace(/./, (c)=> c.toUpperCase())
	
	const fileReader = new FileReader()
	fileReader[`readAs${readType}`](file)
	fileReader.onload = ()=>
		let rs = fileReader.result
		if type == 'blob'
			rs = new Blob([rs], {
				type: file.type
			})
		cb(null, rs)
		
	fileReader.onerror = cb
	return fileReader