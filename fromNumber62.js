//#!py
/**
 * @desc 将62以下的进制转成10进制
 * @param {string} numStr
 * @param {number} [ratio = 62] - ratio must within [2, 62]
 * @return {number}
 */
function fromNumber62(numStr, ratio = 62)
	let num = 0
	
	for let i = 0, l = numStr.length; i < l; i++
		num += Math.pow(ratio, l - 1 - i) * getIndexByChr(numStr[i])
		
	return num
	
	function getIndexByChr(chr)
		let i = chr.charCodeAt(0)
		select true
			case i >= 97
				i -= 97 - 10
			case i >= 65
				i -= 65 - 36
			case i >= 48
				i -= 48
		return i