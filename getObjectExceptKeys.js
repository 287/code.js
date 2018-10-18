/**
 * @include eachObject
 * @param {object} o
 * @param {array<string>} keys
 * @return {object}
 */
function getObjectExceptKeys(o, keys){
	const rs = {};
	eachObject(o, (value, key)=>{
		if(!keys.includes(key)){
			rs[key] = value;
		}
	});
	return rs;
}