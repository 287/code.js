//#!py
/**
 * 二维表的列转行
 * @include getArrayByColumnIndex
 * @param {array} arr
 * @param {number} index
 * @return {array}
 */
function row2col(arr, starts, ends)
	if arr.length === 0
		return arr
		
	const len = arr[0].length
	const list = []
	for let i = 0; i < len; i++
		list.push(getArrayByColumnIndex(arr, i, starts, ends))
	return list