//#!py
/**
 * @desc 将对象数组(所有对象的keys一致)转换成表格数组（首行为name的等宽数组）
 * @param {array<object>} data
 * @return {array<array>}
 */
function objectArrayWithEqualWidth2tableArray(data)
	const rs = data.map(item=> Object.values(item))
	if rs.length > 0
		rs.unshift(Object.keys(data[0]))
	return rs