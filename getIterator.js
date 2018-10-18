/**
 * @include isObject, isPureNumber, isFunction, isIterator, NumberIterator
 * @param {any} o
 * @return {iterator|undefined}
 */
function getIterator(o){
	let rs;
	if(isPureNumber(o)){
		rs = new NumberIterator(o);
	}else if(isObject(o)){
		if(isIterator(o)){
			rs = o;
		}else if(isFunction(o.entries)){
			rs = o.entries();
		}else{
			rs = Object.entries(o).entries();
		}
	}
	return rs;
}