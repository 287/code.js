/**
 * @include isNumber, isArrayLike, eachNumber, eachArray, eachObject
 * @param {array|object|number} o
 * @param {function} cb
 * @param {undefined} [context = undefined]
 * @return {undefined|false}
 */
function eachSimple(o, cb, context){
	if(isNumber(o)){
		return eachNumber(o, cb, context);
	}else if(isArrayLike(o)){
		return eachArray(o, cb, context);
	}else{
		return eachObject(o, cb, context);
	}
}