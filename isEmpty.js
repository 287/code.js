/**
 * @include isArray, isString, isObject, isEmptyObject
 * @param {array|object|string|any} o
 * @return {boolean}
 */
function isEmpty(o){
	if(o == null){
		return true;
	}else if(isArray(o) || isString(o)){
		return o.length === 0;
	}else if(isObject(o)){
		return isEmptyObject(o);
	}
	return false;
}