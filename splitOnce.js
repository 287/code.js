/**
 * split once
 * @param {string} str - string
 * @param {string} sep - separator
 * @param {number} [index = undefined]
 * @param {boolean} [reverse = false] - lr:from left to right, rl:from right to left
 * @return {array<string>} list splited
 */
function splitOnce(str, sep, index, reverse){
	var i = str[reverse ? 'lastIndexOf' : 'indexOf'](sep, index);
	var list = [str];
	if(i > -1){
		list[1] = str.slice(i + sep.length);
		list[0] = str.slice(0, i);
	}
	return list;
}