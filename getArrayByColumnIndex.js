/**
 * 获取二维表的某一列
 * @param {array} arr
 * @param {number} index
 * @return {array}
 */
function getArrayByColumnIndex(arr, index){
	let len = arr.length;
	let list = [];
	for(let i = 0; i < len; i++){
		list.push(arr[i][index]);
	}
	return list;
}