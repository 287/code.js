/**
 * @desc 倒序遍历 请使用eachArray(arr, cb, 'reverse')代替
 * @deprecated
 * @param {arraylike} o
 * @param {function} cb
 * @param {any} [context = undefined]
 * @return {undefined|false}
 */
function eachArrayReverse(o, cb, context){
	for(var i = 0, index; i < o.length; i++){
		index = o.length - 1 - i;
		if(cb.call(context, o[index], index, o) === false){
			return false;
		}
	}
}