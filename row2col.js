/**
 * 二维表的列转行
 * @include getArrayByColumnIndex
 * @param {array} arr
 * @param {number} index
 * @return {array}
 */
function row2col(arr){
	let len = arr[0].length;
	let list = [];
	for(let i = 0; i < len; i++){
		list.push(getArrayByColumnIndex(arr, i));
	}
	return list;
}