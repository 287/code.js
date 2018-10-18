/**
 * @include isString, isNumberLike, isPureNumber
 * @param {any} value
 * @param {number} pValue
 * @return {number}
 */
function toNumberValue(value, pValue){
	if(isString(value)){
		if(value === ''){
			value = 0;
		}else if(value === 'center'){
			value = pValue * .5;
		}else if(isNumberLike(value)){
			value *= 1;
		}else if(value.slice(-1) === '%'){
			value = value.slice(0, -1) * .01 * pValue;
		}
	}
	if(!isPureNumber(value)){
		value = 0;
	}
	return value;
}