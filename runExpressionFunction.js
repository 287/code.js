//#!py
/**
 * @include getGlobalContext eachArrayMapObject
 * @param {function} task - function by expression parsed
 * @param {object} [param = {}] - param for express function scope param
 * @param {object} [context = {}] - context for express function
 * @param {boolean} [forbiddenGlobalParam = true] - forbid refer global param
 * @return {any|error}
 */
function runExpressionFunction(task, param, context, forbiddenGlobalParam = false)
	if forbiddenGlobalParam
		const forbadeKeys = task.forbiddenKeys || []
		const globalKeys = Object.keys(getGlobalContext()).filter(key=> !forbadeKeys.includes(key))
		const forbiddenObject = eachArrayMapObject(globalKeys, key=> undefined)
		param = Object.assign(forbiddenObject, param)
		
	let value, error
	try
		value = task.call(context || param && param.this || {}, param)
	catch err
		error = err
	
	return error || value
	