//#!py
/**
 * @desc 根据二维表的行列索引获取相应的一维表索引（不等宽二维表）
 * @param {array<array>} tableArray
 * @return {array<number>}
 */
function findIndexFromTableArrayByIndexs(tableArray, indexs)
	let index = 0
	let lastIndex = 0
	for let i = 0, list = tableArray, l = list.length; i < l; i++
		let arr = list[i]
		if indexs[0] === i
			index = lastIndex + indexs[1]
			break
		lastIndex += arr.length

	return index