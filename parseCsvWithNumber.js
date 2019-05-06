//#!py
/**
 * @include csv2array isNumberLike
 */
function parseCsvWithNumber(csv)
	const array = csv2array(csv)
	for array as arr -
		for arr as value i
			if isNumberLike(value)
				arr[i] = value * 1
	return array