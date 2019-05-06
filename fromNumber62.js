//#!py
/**
 * @desc 将62以下的进制转成10进制
 * @include char2index
 * @param {string} numStr
 * @param {number} [ratio = 62] - ratio must within [2, 62]
 * @return {number}
 */
function fromNumber62(numStr, ratio = 62)
	let num = 0
	
	for let i = 0, l = numStr.length; i < l; i++
		num += Math.pow(ratio, l - 1 - i) * char2index(numStr[i])
		
	return num