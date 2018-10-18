//#!py
/**
 * @desc 根据二维表的行列索引获取相应的一维表索引（等宽二维表）
 * @param {array<array>} tableArray
 * @param {array<number>} indexs
 * @return {number}
 */
function getIndexFromTableArrayByIndexs(tableArray, indexs)
	return tableArray[0].length * indexs[0] + indexs[1]