//#!py
/**
 * @include eachObject isFunction eachObjectMap
 */
function proxyClass(targetClass, sourceClass, instanceKey)
	const target = targetClass.prototype
	let source = sourceClass.prototype
	
	try
		let t = new sourceClass()
	catch e
		if e.message === 'Illegal constructor'
			source = eachObjectMap(Object.getOwnPropertyDescriptors(sourceClass.prototype), (value)=> value.value)
			
	eachObject(source, (value, key)=>{
		if key in target
			return
			
		if isFunction(value)
			Object.defineProperty(target, key, {
				value: function(...args){
					return this[instanceKey][key](...args)
				},
			})
		else
			Object.defineProperty(target, key, {
				get: function(){
					return this[instanceKey][key]
				},
				set: function(value){
					return this[instanceKey][key] = value
				},
			})
	})
	
	return targetClass