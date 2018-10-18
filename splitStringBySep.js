/**
 * @include isArray, trim, isNumberLike
 * @param {string} str
 * @param {array<string>|string} sep
 * @param {object} [op]
 * @param {boolean} [op.trimKey = false]
 * @param {boolean} [op.trimValue = false]
 * @param {boolean} [op.parseNumberLike = false]
 * @return {object|array}
 */
function splitStringBySep(str, sep, op = {}){
	let rs;
	if(isArray(sep)){
		rs = {};
		str.split(sep[1]).forEach((item)=>{
			let [key, value] = item.split(sep[0]);
			if(op.trimKey){
				key = trim(key);
			}
			if(op.trimValue){
				value = trim(value);
			}
			if(op.parseNumberLike && isNumberLike(value)){
				value *= 1;
			}
			rs[key] = value;
		});
	}else{
		rs = [];
		str.split(sep).forEach((value)=>{
			if(op.trimValue){
				value = trim(value);
			}
			if(op.parseNumberLike && isNumberLike(value)){
				value *= 1;
			}
			rs.push(value);
		});
	}
	return rs;
}