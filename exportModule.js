//#!py
/**
 * @param {any} obj - module object
 * @param {string} [name = o.name] - module name
 * @return {any}
 */
function exportModule(obj, name)
	name = name || obj.name
	
	if typeof define === 'function' && define.amd
		define([], obj)
		
	else if typeof module === 'object' && module.exports
		module.exports = obj
		
	else if typeof window === 'object'
		window[name] = obj
		
	return obj