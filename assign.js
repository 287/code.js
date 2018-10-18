/**
 * @include isObject, isFunction
 */
function assign(target){
	target = isObject(target) ? target : {};
	var i, o, key;
	for(i = 1; i < arguments.length; i++){
		o = arguments[i];
		if(isObject(o)){
			for(key in o){
				if(o.hasOwnProperty(key)){
					target[key] = o[key];
				}
			}
		}
	}
	return target;
}