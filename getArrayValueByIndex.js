//#!py
function getArrayValueByIndex(arr, index)
	if index < 0
		index = arr.length + index
	return arr[index]