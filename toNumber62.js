//#!py
/**
 * @desc 将10进制转换成62以下的进制
 * @include index2char
 * @param {number} num
 * @param {number} [ratio = 62] - ratio must within [2, 62]
 * @return {string}
 */
function toNumber62(num, ratio = 62)
	const list = []
	
	while num >= ratio
		list.push(index2char(num % ratio))
		num = Math.floor(num / ratio)
	
	list.push(index2char(num))
		
	return list.reverse().join('')