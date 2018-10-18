//#!py
/**
 * @param {string|array} string
 * @param {string|any} findStr
 * @return {array<number>}
 */
function findIndexsByIndexOf(string, findStr)
	const indexs = []
	
	if findStr === ''
		indexs.push(0)
	else
		let index = 0
		while (index = string.indexOf(findStr, index)) !== -1
			indexs.push(index)
			index += findStr.length
	
	return indexs

