//#!py
/**
 * @desc 在string中用indexs分隔并替换字符串
 * @include isArray
 * @param {string} string
 * @param {array<array<number, number>>} indexs - [[start_index, end_index]]
 * @param {array<array<string>|string>} strs
 * @return {string}
 */
function replaceStringByIndexs(string, indexs, strs)
	const arr = []
	const multiple = isArray(strs)
	
	let index = 0
	for indexs as item i
		const [start, end] = item
		arr.push(string.slice(index, start))
		arr.push(multiple ? strs[i] : strs)
		index = end
	
	return arr.join('')