/**
 * @include isNumber, isNonNumber
 * @param {*} o
 * @return {boolean}
 */
function isPureNumber(o){
	return isNumber(o) && !isNonNumber(o);
}