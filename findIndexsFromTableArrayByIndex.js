//#!py
/**
 * @desc 根据一维表索引获取相应的二维表的行列索引（不等宽二维表）
 * @param {array<array>} tableArray
 * @return {array<number>}
 */
function findIndexsFromTableArrayByIndex(tableArray, index)
	let indexs = []
	let lastIndex = 0
	for let i = 0, list = tableArray, l = list.length; i < l; i++
		let arr = list[i]
		lastIndex += arr.length
		if index < lastIndex
			indexs.push(i, arr.length - (lastIndex - index))
			break

	return indexs