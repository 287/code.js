/**
 * 按键值组装成声明变量的形式，替代with语法
 * @param {array<string>} keys
 * @param {string} [objectName = 'this']
 * @return {string}
 */
function toWithString(keys, objectName = 'this'){
	let rs = '';
	let list = [];
	let exceptKeys = ['if', 'class', 'function', 'for'];
	keys.forEach((key)=> {
		if(!exceptKeys.includes(key) && /^[a-z\$_]/i.test(key) && !/\./i.test(key)){
			list.push(`${key} = ${objectName}.${key}`);
		}
	});
	if(list.length){
		rs = `var ${list.join(', ')};`;
	}
	return rs;
}