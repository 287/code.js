/**
 * 数组去重
 * @include removeArrayValue
 * @param {array} array
 * @return {array}
 */
function removeArrayDuplicateValues(array){
	for(var i = 0; i < array.length; i++){
		removeArrayValue(array, array[i], true, 1, i);
	}
	return array;
}