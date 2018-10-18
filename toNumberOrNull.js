/**
 * @include isPureNumber, isString, isNumberLike
 * @param {any} value
 * @return {number|null}
 */
function toNumberOrNull(value){
	if(isPureNumber(value)){
		// nothing to do
	}else if(isString(value) && isNumberLike(value)){
		value *= 1;
	}else{
		value = null;
	}
	return value;
}