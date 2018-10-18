//#!py
/**
 * @desc 将10进制转换成62以下的进制
 * @param {number} num
 * @param {number} [ratio = 62] - ratio must within [2, 62]
 * @return {string}
 */
function toNumber62(num, ratio = 62)
	const list = []
	
	while num >= ratio
		list.push(getChrByIndex(num % ratio))
		num = Math.floor(num / ratio)
	
	list.push(getChrByIndex(num))
		
	return list.reverse().join('')
		
	function getChrByIndex(i)
		select true
			case i < 10
				i += 48
			case i < 36
				i += 97 - 10
			default
				i += 65 - 36
		return String.fromCharCode(i)