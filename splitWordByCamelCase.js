//#!py
function splitWordByCamelCase(text)
	const regx = /[A-Z]/g
	const rs = []
	
	let index = 0
	let skip = 0
	let m
	while m = regx.exec(text)
		if m.index === 0
			continue
		if m.index === index + 1 + skip
			skip++
			continue
			
		rs.push(text.slice(index, m.index))
		index = m.index
		
	rs.push(text.slice(index))
		
	return rs