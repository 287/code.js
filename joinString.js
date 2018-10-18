/**
 * @include isArray, isPureObject 
 * @param {object|array} o
 * @param {array<array|string>} seps
 * @return {string}
 */
function joinString(o, seps){
	let rs;
	if(isPureObject(o)){
		let sep = seps.shift(0);
		rs = Object.keys(o).map((key)=> `${key}${sep[0]}${joinString(o[key], seps)}`).join(sep[1]);
	}else if(isArray(o)){
		let sep = seps.shift(0);
		rs = o.map((value)=> joinString(value, seps)).join(sep);
	}else{
		rs = o;
	}
	
	return rs;
}