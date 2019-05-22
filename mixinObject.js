//#!py
/**
 * @desc 深层合并对象或者数组
 * @include isArray isPureObject
 */
function mixinObject(target, ...sources)
	for sources as source -
		if isPureObject(source)
			target = mixin(target, source)
		
	return target
		
		
	function mixin(target, source)
		if !target
			return source
			
		if isArray(source)
			for source as value key
				target[key] = mixin(target[key], value)
				
		else if isPureObject(source)
			for source as value key -
				target[key] = mixin(target[key], value)
				
		else
			target = source
		
		return target