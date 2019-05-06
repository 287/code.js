//#!py
/**
 * @include rWeightedFactors
 */
function generateRCodeByString(str, ratio = 36)
	let total = 0
	for str.length as i
		total += str.charCodeAt(i) * rWeightedFactors[i % rWeightedFactors.length]
	
	return total % ratio