/**
 * 把一维数组按段拆分
 * @param {array} arr
 * @param {number} [len = 1]
 * @return {array<array>}
 */
function splitArrayByLength(arr, len = 1, type = 'l'){
	const list = [];
	for(let i = 0, l = arr.length, count = Math.ceil(l / len), y = l % len, added = type === 'l' || y === 0 ? 0 : len - y; i < count; i++){
		let start = i * len - added;
		let end = start + len;
		if(i === 0){
			start = Math.max(start, 0);
		}
		list.push(arr.slice(start, end));
	}
	return list;
}