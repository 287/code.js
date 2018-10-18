/**
 * @param {arraylike} arr
 * @return {array}
 */
function arraySlice(arr, start, end){
	return Array.prototype.slice.call(arr, start, end);
}