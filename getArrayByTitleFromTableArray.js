//#!py
/**
 * @desc 
 * @include getArrayByColumnIndex
 */
function getArrayByTitleFromTableArray(tableArray, title)
	const titles = tableArray[0]
	const index = titles.indexOf(title)
	if index > -1
		return getArrayByColumnIndex(tableArray, index)