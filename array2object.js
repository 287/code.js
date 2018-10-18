/**
 * @param {array<array>} arr - like [['key', 'value'], ['key', 'value']]
 * @return {object}
 */
function array2object(arr){
	let rs = {};
	arr.forEach(([key, value])=>{
		rs[key] = value;
	});
	return rs;
}