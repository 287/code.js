//#!py
function findIndexFromString(string, findStr, skipIndex, reverse = false, skip = 0)
	const indexOfKey = reverse ? 'lastIndexOf' : 'indexOf'
	
	if findStr === ''
		return 0
	
	if skipIndex === undefined
		skipIndex = !reverse ? 0 : undefined
	let count = 0
	while count <= skip && skipIndex !== -1
		if count > 0
			if !reverse
				skipIndex += findStr.length
			else
				skipIndex--
				if skipIndex === -1
					break
			
		skipIndex = string[indexOfKey](findStr, skipIndex)
		count++
	
	return skipIndex

