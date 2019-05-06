//#!py
/**
 * @desc 
 * @include getArrayByColumnIndex removeArrayDuplicateValues 
 * @param {array} tableArray
 * @return {array}
 */
function tableArray2crossTableArray(tableArray, op = {})
	const [keys, fields] = [0, 1].map(i=> removeArrayDuplicateValues(getArrayByColumnIndex(tableArray, i, 1)))
	fields.unshift(tableArray[0][0])
	
	const rs = []
	
	rs.push(fields)
	
	for keys as key -
		const arr = new Array(fields.length)
		arr[0] = key
		rs.push(arr)
		
	for 1 to tableArray as line -
		const [key, field, value] = line
		rs[keys.indexOf(key) + 1][fields.indexOf(field, 1)] = value
		
	return rs
	
	// const groups = parseArrayWithGroupBy(tableArray.slice(1), 0)
	
	// for  as arr key -
		// for parseArrayWithGroupBy(arr, 1) as item field -
			// rs.push(key,)