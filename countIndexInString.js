/**
 * @desc 统计某些字符串在指定字符串中出现的索引
 * @param {string} string
 * @param {string} str
 * @return {array<number>}
 */
function countIndexInString(string, str){
	let indexs = [];
	if(str.length !== 0){
		let index = 0;
		while((index = string.indexOf(str, index)) !== -1){
			indexs.push(index);
			index += str.length;
		}
	}
	return indexs;
}