//#!py
/**
 * @desc 
 * @param {array} tableArray
 * @return {array}
 */
function crossTableArray2tableArray(tableArray, op = {})
	const rs = []
	const fields = tableArray[0] || []
	
	rs.push([fields.shift(), '字段', '值'])

	for 1 to tableArray as line -
		for 1 to line as value i
			rs.push([line[0], fields[i - 1], value])
			
	return rs