/**
 * @param {array} arr
 * @param {function} cb(value, i, arr)
 * @param {object} [context]
 * @return {array}
 */
function arrayFilter(arr, cb, context){
	var list = [];
	for(var i = 0; i < arr.length; i++){
		if(cb.call(context, arr[i], i, arr)){
			list.push(arr[i]);
		}
	}
	return list;
}