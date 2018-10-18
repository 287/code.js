//#!py
/**
 * @desc 改变value在array中的索引
 */
function changeIndexOfArrayValue(array, value, index)
	let i = array.indexOf(value)
	if i > -1
		if index === i
			return
			
		array.splice(i, 1)
	
	array.splice(index, 0, value)
	
	return array