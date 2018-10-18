/**
 * @include getType
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function isEqual(a, b){
	if(a === b || (a == null && b == null)){
		return true;
	}
	let [type, typeb] = [getType(a), getType(b)];
	if(type !== typeb){
		return false;
	}
	switch(type){
	case 'nan':
		return true;
	break; case 'array':
		return isArrayEqual(a, b);
	break; case 'object':
		return isObjectEqual(a, b);
	}
	return false;
	
	
	function isArrayEqual(a, b){
		return a.length === b.length && a.every((value, i)=> isEqual(value, b[i]));
	}
	
	function isObjectEqual(a, b){
		let keys = [Object.keys(a), Object.keys(b)];
		keys.forEach(arr=> arr.sort());
		return isArrayEqual(...keys) && keys[0].every(key=> isEqual(a[key], b[key]));
	}
}