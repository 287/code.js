//#!py
/**
 * @desc 拆分字符串，规避()[]""''等字符的包裹
 * @include eachStringBySplitWithoutWrap
 * @param {string} string
 * @param {string} sep
 * @param {number} [times = 0] - 限制拆分次数
 * @param {array} [wraps]
 * @return {array<string>}
 */
function splitStringWithinWrap(string, sep, times = 0, wraps)
	const arr = []
	eachStringBySplitWithoutWrap(string, sep, {limit: times, wraps}, str=> arr.push(str))
	return arr