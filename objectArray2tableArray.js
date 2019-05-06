//#!py
/**
 * @desc 将对象数组转换成表格数组（首行为name的等宽数组）
 * @param {array<object>} data
 * @return {array<array>}
 */
function objectArray2tableArray(data)
	const keys = []
	
	for data as item -
		Object.keys(item).forEach(key => keys.includes(key) || keys.push(key))
	
	const rs = []
	
	for data as item -
		rs.push(keys.map(key => item[key]))
	
	if rs.length > 0
		rs.unshift(keys)
		
	return rs