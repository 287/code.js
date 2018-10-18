//#!py
/**
 * @include isNonNumber
 */
function getPercent(value, num1, num2, toFixed = true)
	let percent
	if num2 == null
		percent = value / num1
	else
		// const min = Math.min(num1, num2)
		// const max = Math.max(num1, num2)
		// percent = (value - min) / (max - min)
		percent = (value - num1) / (num2 - num1)
	
	if isNonNumber(percent)
		percent = 0
	else
		if toFixed
			percent = Math.round(percent * 1000) / 1000
		
	return percent