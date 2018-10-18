/**
 * @param {array} array
 * @param {any} value
 * @param {boolean} [removeAll = false] - remove all
 * @param {number} [skip = 0] - skip number
 * @param {number} [start = 0] - start index
 * @return {array}
 */
function removeArrayValue(array, value, removeAll = false, skip = 0, start = 0){
	var count = 0;
	var i = start;
	var rs;
	while((i = array.indexOf(value, i)) !== -1){
		count++;
		if(count > skip){
			array.splice(i, 1);
			rs = value
		}else{
			i++;
		}
		if(!removeAll){
			break;
		}
	}
	return rs;
}