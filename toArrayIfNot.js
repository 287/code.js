/**
 * 如果不是数组的话，把他放进数组
 * @include isArray fillArray
 * @param {array|any} o
 * @return {array}
 */
function toArrayIfNot(o, length = 1){
	return isArray(o) ? o : fillArray([], o, 0, length);
}