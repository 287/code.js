//#!py
/**
 * 获取二维表的某一列
 * @param {array} arr
 * @param {number} index
 * @return {array}
 */
function getArrayByColumnIndex(arr, index, starts = 0, ends = arr.length)
	const list = []
	for let i = starts; i < ends; i++
		list.push(arr[i][index])
	return list