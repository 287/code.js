//#!py
/**
 * 数值格式化并加上单位 
 * @include isNumber
 * @param {number} num - 数值
 * @param {number|array<number>} ratios - 系数比例
 * @param {array<string>} [units] - 系数单位
 * @return {object|string}
 */
function formatNumber(number, ratios, units, verbose)
	let input = number
	let isFixedRatio = isNumber(ratios)
	let index = 0
	let unit
	let ouput
	let ratio = isFixedRatio ? ratios : ratios[index]
	
	while index < 10 && number >= ratio
		if units
			if units[index] == null
				break
				
		ratio = isFixedRatio ? ratios : ratios[index]
		number /= ratio
		
		index++
		
	unit = units && units[index] || ''
	
	ouput = number.toFixed(2) * 1 + unit
	
	if verbose
		ouput = {
			ouput,
			input,
			number,
			unit,
			index,
		}
	
	return ouput