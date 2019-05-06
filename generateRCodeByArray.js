//#!py
/**
 * @include rWeightedFactors
 */
function generateRCodeByArray(arr)
	const codes = [1,0,10,9,8,7,6,5,4,3,2]
	
	let total = 0
	for arr as v, i
		total += v * rWeightedFactors[i % rWeightedFactors.length]
	
	return codes[total % 11]