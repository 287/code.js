//#!py
function isEqualValuesOfArray(arr1, arr2)
	return !arr1.some((v, i)=> arr2[i] != v)