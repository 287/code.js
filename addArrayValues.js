/**
 * @include addArrayValue
 * @param {array} array
 * @param {array} values
 * @return {array}
 */
function addArrayValues(array, values){
	values.forEach(function(value){
		addArrayValue(array, value);
	});
	return array;
}