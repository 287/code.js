//#!py
/**
 * @desc 将对象数组(所有对象的keys一致)转换成表格数组（首行为name的等宽数组）
 * @param {array<object>} data
 * @return {array<array>}
 */
function objectArrayWithEqualWidth2tableArray(data)
	const rs = []
	
	if data.length > 0
		const keys = Object.keys(data[0])
		
		rs.push(keys)
	
		for data as item -
			rs.push(keys.map(key => item[key]))
			
	return rs