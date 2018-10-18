/**
 * @include removeArrayValue
 * @param {array} array
 * @param {any} value
 * @param {boolean} [removeAll = false]
 * @param {number} [skip = 0] - skip number
 * @return {array}
 */
function removeArrayValues(array, values, ...args){
	values.forEach((value)=> removeArrayValue(array, value, ...args));
	return array;
}