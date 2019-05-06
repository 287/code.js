//#!py
/**
 * @include 
 */
function createProxyPropertySet(keys)
	class PropertySet
		constructor(target, onchange)
			Object.defineProperty(this, '__data__', {
				enumerable: false,
				value: {
					target,
					onchange,
				},
			})
	
	keys.forEach((key)=> {
		Object.defineProperty(PropertySet.prototype, key, {
			enumerable: true,
			get(){
				return this.__data__.target[key]
			},
			set(value){
				const lastValue = this.__data__.target[key]
				if lastValue !== value
					this.__data__.target[key] = value
					if this.__data__.onchange !== undefined
						this.__data__.onchange(key, value, lastValue)
				return value
			},
		})
	})
	
	return PropertySet