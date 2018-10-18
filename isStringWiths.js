//#!py
/**
 * @desc 只要前后随意满足一条记录 即 return true
 * @include isStringStartsWiths isStringEndsWiths
 * @param {string} str
 * @param {array<string>} [start]
 * @param {array<string>} [end]
 * @return {boolean}
 */
function isStringWiths(str, start, end)
	if start != null && start.length > 0
		if isStringStartsWiths(str, start)
			return true
			
	if end != null && end.length > 0
		if isStringEndsWiths(str, end)
			return true
			
	return false