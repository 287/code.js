/**
 * @param {array} arr
 * @param {function} cb - cb(value, i, arr)
 * @param {object} [context]
 * @return {array}
 */
function arrayMap(arr, cb, context){
	var list = [];
	for(var i = 0; i < arr.length; i++){
		list.push(cb.call(context, arr[i], i, arr));
	}
	return list;
}