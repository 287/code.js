/**
 * 获取二维表的某些列
 * @include getArrayByColumnIndex
 * @param {array} arr
 * @param {number} index
 * @return {array}
 */
function getArrayByColumnIndexs(arr, indexs){
	return indexs.map(i=> getArrayByColumnIndex(arr, i));
}