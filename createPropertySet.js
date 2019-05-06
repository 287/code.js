//#!py
/**
 * @include 
 */
function createPropertySet(keys, __get, __set, __onchange)
	class PropertySet
		__bindKey(key)
			Object.defineProperty(PropertySet.prototype, key, {
				get(){
					return this.__get(key)
				},
				set(value){
					const lastValue = this.__get(key)
					if lastValue !== value
						this.__set(key, value)
						if this.__onchange !== undefined
							this.__onchange(key, value, lastValue)
					return value
				},
				// enumerable: true,
			})
	
	Object.assign(PropertySet.prototype, {
		__get,
		__set,
		__onchange
	})
	
	const propertySet = new PropertySet
	
	if keys
		keys.forEach(key=> propertySet.__bindKey(key))
			
	return propertySet