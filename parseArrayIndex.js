//#!py
function parseArrayIndex(arr, index)
	if index < 0
		index = arr.length + index
	return index