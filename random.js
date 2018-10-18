//#!py
/**
 * @param {number} num1
 * @param {number} [num2]
 * @return {number}
 */
function random(num1 = 1000000, num2 = 0)
	const min = Math.min(num1, num2)
	const max = Math.max(num1, num2)
	const dValue = (max - min)
	
	return Math.round(Math.random() * dValue) + min