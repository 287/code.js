//#!py
/**
 * @include isObjectArray objectArrayWithEqualWidth2tableArray tableArray2tableNode
 * @param {array<array|object>} arr
 * @param {element} [table]
 * @return {element}
 */
function toTableNode(arr, table)
	if !table
		table = document.createElement('table')
		
	if isObjectArray(arr)
		arr = objectArrayWithEqualWidth2tableArray(arr)
		
	return tableArray2tableNode(arr, table)