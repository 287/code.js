/**
 * split once
 * @param {string} str - string
 * @param {string} sep - separator
 * @param {string} [direction=lr] - lr:left -> right, rl:right -> left
 * @return {array<string>} list splited
 */
function splitOnce(str, sep, direction){
	var i = str[direction !== 'rl' ? 'indexOf' : 'lastIndexOf'](sep);
	var list = [str];
	if(i > -1){
		list[1] = str.slice(i + sep.length);
		list[0] = str.slice(0, i);
	}
	return list;
}