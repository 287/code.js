//#!py
/**
 * @param {string} string
 * @param {string}
 */
function findJsonFromString(string)
	const wraps = [
		'[]',
		'{}',
	]
	
	let jsonWrap
	let json = ''
	
	const startIndexs = wraps.map(wrap=> string.indexOf(wrap[0]))
	const range = []
	for string as chr i
		for wraps as wrap -
			if wrap[0] === chr
				jsonWrap = wrap
				break
				
		if jsonWrap !== undefined
			range[0] = i
			
			for string as chr i step -1
				if jsonWrap[1] === chr
					range[1] = i + 1
					break
				
			
			break
			
	if range.every(i=> i !== undefined)
		json = string.slice(...range)
		
	return json