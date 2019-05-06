//#!py
function parseCsvToArray(csv, sep = ',')
	const rs = []
	
	csv.split(/\r?\n/).forEach((line)=> {
		if line === ''
			return 
		let justSep = true
		for line.length as i
			if line.charAt(i) !== sep
				justSep = false
				break
		if justSep
			return 
		rs.push(line.split(sep))
	})
	
	return rs