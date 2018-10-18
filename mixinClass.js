/**
 * @include assigns
 */
function mixinClass(...Classs){
	class MixinClass{
		constructor(){
			assigns(this, ...constructors);
		}
	}
	let constructors = [];
	for(let Class of Classs){
		constructors.push(new Class);
		Object.getOwnPropertyNames(Class.prototype).forEach(key=> {
			MixinClass.prototype[key] = Class.prototype[key];
		});
	}
	return MixinClass;
}