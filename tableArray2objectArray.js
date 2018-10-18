//#!py
/**
 * @desc 将表格数组转换成对象数组（首行为name的数组）
 * @param {array<array>} data
 * @return {array<object>}
 */
function tableArray2objectArray(data)
	let rs = []
	let names
	data.forEach((arr, i)=>{
		if i === 0
			names = arr
		else
			let item = {}
			arr.forEach((value, i)=> item[names[i]] = value)
			rs.push(item)
	})
	return rs