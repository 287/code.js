/**
 * @param {array} array
 * @param {*} value
 * @return {array}
 */
function addArrayValue(array, value){
	if(array.indexOf(value) === -1){
		array.push(value);
	}
	return array;
}