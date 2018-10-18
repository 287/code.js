//#!py
/**
 * @desc 把表达式字符串解析成函数，并通过静态声明禁止访问全局变量
 * @include getGlobalContextAllKeys
 * @param {string} expStr - js expression
 * @param {array|string} allowedGlobalKeys - array or 'all'
 * @return {function|error}
 */
const defaultGlobalKeys = getGlobalContextAllKeys()
const defaultAllowedGlobalKeys = ['Object', 'Array', 'Number', 'Infinity', 'NaN', 'undefined', 'Boolean', 'String', 'Date', 'RegExp', 'Error', 'JSON', 'Math', 'console', 'Map', 'Set', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape', 'unescape', 'isFinite', 'isNaN', 'parseFloat', 'parseInt']

function parseExpressionToFunction(expStr, allowedGlobalKeys)
	allowedGlobalKeys = allowedGlobalKeys || defaultAllowedGlobalKeys
	const forbiddenKeys = allowedGlobalKeys === 'all' ? 't' : defaultGlobalKeys.filter(key=> !allowedGlobalKeys.includes(key))
	
	if !expStr.includes('\n')
		expStr = `return (${expStr})`
		
	let expressionFunction, error
	try
		expressionFunction = Function('ExpParams', `var ${forbiddenKeys}; with(ExpParams || {}){return (function(){'use strict';\n//code here\n\n${expStr}\n\n}).call(this)}`) 
		expressionFunction.forbiddenKeys = forbiddenKeys
	catch err
		error = err
		
	return error || expressionFunction