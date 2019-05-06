//#!py
function setArrayValueByIndex(arr, index, value)
	if index < 0
		index = arr.length + index
	return arr[index] = value