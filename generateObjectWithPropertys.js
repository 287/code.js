//#!py
function generateObjectWithPropertys(keys, getter, setter, Target)
	Target = Target || function Object(){}
	keys.forEach(key=> Object.defineProperty(Target.prototype, key, {
		// configurable: true,
		get: function(){
			return getter.call(this, key)
		},
		set: function(value){
			return setter.call(this, key, value)
		},
	}))
	return new Target