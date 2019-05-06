//#!py
/**
 * @include isString isRegExp parseGlobString
 * @param {string} glob
 * @param {object} [op]
 * @param {boolean} [op.withoutStarts = false]
 * @param {boolean} [op.withoutEnds = false]
 * @return {string|regexp}
 */
function globString2globRule(rule, op = {})
	if isRegExp(rule)
		return rule
		
	if !isString(rule)
		return ''
		
	if !/[\*\?\[\{\(]/.test(rule)
		return rule
	
	rule = rule.replace(/`(\W)/g, (t, m)=> '\\' + m)
	rule = rule.replace(/(\.)/g, (t, m)=> '\\' + m)
	
	rule = (op.withoutStarts ? '' : '^') + parseGlobString(rule) + (op.withoutEnds ? '' : '$')

	return new RegExp(rule)