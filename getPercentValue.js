//#!py
function getPercentValue(ratio, num1, num2, step)
	let value
	if num2 === undefined
		value = num1 * ratio
	else
		value = (num2 - num1) * ratio + num1
	
	if step
		value = Math.round(value / step) * step
	
	return value