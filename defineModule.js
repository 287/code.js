//#!py
/**
 * @include isString isFunction
 */
modules.define = function(){
	function define(...args)
		let name = modules.__name, module
		
		for args as item -
			if isString(item)
				name = item
			else if isFunction(item)
				const exports = {}
				module = item(exports) || exports
				
		modules[name] = module
		
	define.amd = true
	
	return define
}()