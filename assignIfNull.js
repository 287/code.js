/**
 * @desc 如果目标对象为null时则assign
 * @include isObject eachObject
 */
function assignIfNull(target, ...args){
	target = isObject(target) ? target : {};
	args.forEach((obj)=>{
		isObject(obj) && eachObject(obj, (value, key)=> {
			if(target[key] == null && value != null){
				target[key] = value;
			}
		});
	});
	return target;
}