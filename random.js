//#!py
/**
 * @param {number} num1
 * @param {number} [num2]
 * @return {number}
 */
function random(num1 = 1000000, num2 = 0)
	const dValue = Math.abs(num1 - num2)
	const min = Math.min(num1, num2)
	
	return Math.floor(Math.random() * dValue) + min