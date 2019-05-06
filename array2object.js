//#!py
/**
 * @param {array<array|string>} arr - like [[key, value]] or keys
 * @param {array} [values]
 * @return {object}
 */
function array2object(arr, values)
	const obj = {}
	
	if values
		arr.forEach((key, i)=> obj[key] = values[i])
	else
		arr.forEach(([key, value])=> obj[key] = value)
	
	return obj