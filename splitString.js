//#!py
/**
 * 支持n层拆分，支持拆分成数组和对象
 * @include splitStringByChr eachSimple
 * @param {string} str
 * @param {array<array|string>|string} seps
 */
function splitString(str, sep, op = {trimValue: false})
	if isString(sep)
		splitStringByChr()
	
	
	
	const param = {
		trimKey: op.trimKey,
	};
	
	return split(str, 0);
	
	function split(str, level){
		let rs;
		if(sep = seps[level]){
			rs = splitStringBySep(str, sep, !!seps[level + 1] ? param : op);
			if(seps[level + 1]){
				eachSimple(rs, (value, key)=>{
					rs[key] = split(value, level + 1);
				});
			}
		}
		return rs;
	}
}

if 