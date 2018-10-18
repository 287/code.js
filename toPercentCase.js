//#!py
/**
 * @desc 把小数转换成百分比 即 以 % 结尾的字符串
 */
function toPercentCase(value)
	value *= 100
	value += '%'
	return value