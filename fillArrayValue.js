//#!py
/**
 * 填充数组
 * @param {array} o
 * @param {any} value
 * @param {number} [start = 0]
 * @param {number} [end = o.length]
 * @return {array}
 */
function fillArrayValue(arr, value, start = 0, end = arr.length)
	for let i = start; i < end; i++
		arr[i] = value
		
	return arr