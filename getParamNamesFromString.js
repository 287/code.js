/**
 * 在可执行字符串中获取变量的名称
 * @include replaceStringByMark
 * @param {string} str - js expression
 * @param {array<string>} excludes - exclude keys
 * @return {array<string>} keys
 */
function getParamNamesFromString(str){
	str = replaceStringByMark(str)[0].replace(/<\d+>/g, '');
	let keys = [];
	str.replace(/(?:^|[\W])([a-z_$][\w\.]*)/ig, (t, key, index, str)=> {
		let endIndex = index + t.length;
		let endChar = str.slice(endIndex, endIndex + 1);
		if(endChar === '('){
			key = key.replace(/\.\w+$/, '');
		}
		keys.push(key);
	});
	return keys;
}