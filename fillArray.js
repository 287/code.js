/**
 * 填充数组
 * @param {array} o
 * @param {any} value
 * @param {number} [start = 0]
 * @param {number} [end = o.length]
 * @return {array}
 */
function fillArray(o, value, start = 0, end = o.length){
	for(let i = start; i < end; i++){
		o[i] = value;
	}
	return o;
}