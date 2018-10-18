//#!py
/**
 * @desc 从一个指定长度根据方向获取现有索引的下一个索引
 * @param {number} len
 * @param {number} index
 * @param {string} key - [prev, next]
 * @return {number}
 */
function getNextIndexFromLengthByDirectionKey(len, index, key)
	if key === 'prev'
		if index - 1 >= 0
			index--
		else
			index = len - 1
	else
		if index + 1 < len
			index++
		else
			index = 0
	return index