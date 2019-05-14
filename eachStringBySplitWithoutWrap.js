//#!py
/**
 * @desc 通过拆分字符串遍历，规避()[]""''等字符的包裹
 * @include findIndexWithoutWrapFromString isFunction
 * @param {string} str
 * @param {string} sep
 * @param {object} [op]
 * @param {number} [op.limit = 0] - 限制拆分次数
 * @param {array} [op.wraps]
 * @param {function} task
 * @return {undefined}
 */
function eachStringBySplitWithoutWrap(string, sep, op, task)
	if isFunction(op)
		task = op
		op = null
		
	op = op || {}
	
	let index = 0
	let lastIndex = 0
	let sepIndex
	
	while (sepIndex = findIndexWithoutWrapFromString(string, sep, lastIndex, undefined, op.wraps)) !== -1
		if task(string.slice(lastIndex, sepIndex), index++, lastIndex = sepIndex + sep.length) === false
			return
			
		if op.limit
			if op.limit === index
				break
	
	task(string.slice(lastIndex), index++, lastIndex)