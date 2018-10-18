/**
 * @desc 遍历 key 的数组，回调返回value生成object
 * @param {array} keys
 * @param {function} cb
 * @return {object}
 */
function eachArrayMapObject(keys, cb){
	let object = {};
	
	keys.forEach((key, ...args)=> object[key] = cb(key, ...args));
	
	return object;
}