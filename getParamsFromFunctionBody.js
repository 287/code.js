/**
 * 在函数体字符串中获取变量名称
 * @param {string} text - js expression
 * @param {array<string>} excludes - exclude keys
 * @return {array<string>} keys
 */
function getParamsFromFunctionBody(text, excludes){
	var keys = [], object = {}, index = 0;
	var name, err, fn;
	excludes = excludes || [];
	excludes.forEach(function(key){
		object[key] = '';
	});
	try{
		if(text.charAt(0) === '{') text = '(' + text + ')';
		fn = Function('var __rs = null; var window = null; with(this){ !function(){"use strict";\n try{'+ text +'}catch(e){__rs = e} \n}();} return __rs;');
	}catch(e){console.log('getParamFromText error:', text, e)}
	if(fn){
		while(index++ < 30 && (err = fn.call(object)) && err.name === 'ReferenceError' && (name = err.message.match(/^[^ ]+/))){
			object[name[0]] = '';
		}
		for(var key in object) if(excludes.indexOf(key) === -1) keys.push(key);
	}
	return keys;
}