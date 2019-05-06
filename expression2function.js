//#!py
/**
 * @desc 把表达式字符串解析成函数
 * @param {string} expStr - js expression
 * @return {function|error}
 */
function expression2function(expStr)
	if !expStr.includes('\n') && !expStr.includes('return')
		expStr = `return ${expStr}`
		
	let fn, error
	try
		fn = Function('_P1', '_P2', `with(_P2 || {}){ with(_P1 || {}){return (function(){'use strict';\n//code here\n\n${expStr}\n\n}).call(this)}}`)
	catch err
		error = err
		
	return error || fn