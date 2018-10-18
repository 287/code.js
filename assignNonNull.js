/**
 * @desc 如果对象不为null时则assign
 * @include isObject eachObject
 */
function assignNonNull(target, ...args){
	target = isObject(target) ? target : {};
	args.forEach((obj)=>{
		isObject(obj) && eachObject(obj, (value, key)=> {
			if(value != null){
				target[key] = value;
			}
		});
	});
	return target;
}