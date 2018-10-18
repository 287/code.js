/**
 * @param {object} o
 * @param {array<string>} keys
 * @return {object}
 */
function removeObjectKeys(o, keys){
	keys.forEach((key)=> delete o[key]);
	return o;
}