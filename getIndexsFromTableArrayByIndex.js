//#!py
/**
 * @desc 根据一维表索引获取相应的二维表的行列索引（等宽二维表）
 * @param {array<array>} tableArray
 * @return {array<number>}
 */
function getIndexsFromTableArrayByIndex(tableArray, index)
	let rowIndex = index / tableArray[0].length >> 0
	let colIndex = rowIndex === 0 ? index : index % rowIndex
	
	return [rowIndex, colIndex]