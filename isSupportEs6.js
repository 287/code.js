function isSupportEs6(showDetail){
	var tests = {
		let: 'let a = 1; return a === 1',
		const: 'const a = 1; return a === 1',
		class: '@function class a{}',
		template: 'return `1` === "1"',
		arrow: '@function ()=>{}',
		destructuring: 'let [a] = [[1]]; a.push(...[2]); return a == "1,2"',
		async: '@function async ()=>{}',
		generator: '@function function* a(){}',
		Set: '',
		Map: '',
		Proxy: '',
		Symbol: '',
		Promise: '',
		Reflect: '@object Reflect',
		iterator: '@symbol Symbol.iterator',
		forof: 'let list = []; for(let a of [1,2]) list.push(a); return list == "1,2"',
	};
	var result = {};
	var rs = true;
	Object.keys(tests).forEach(function(name){
		var code = tests[name];
		if(code === ''){
			code = '@function ' + name;
		}
		var m;
		if(m = code.match(/@([a-z]+) /)){
			var type = m[1];
			code = code.slice(m[1].length + 2);
			code = 'return typeof ('+ code +') === "'+ type +'"';
		}
		result[name] = test(code);
		if(!result[name]){
			rs = result[name];
		}
	});
	
	return showDetail ? result : rs;
	
	function test(code){
		try{
			return Function(code)();
		}catch(e){
			return false;
		}
	}
}