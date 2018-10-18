/**
 * 把命令行参数合成对象
 * - 第一个参数指定哪些key可以接受参数的数量限制
 * - 第一个参数对象中key对应的value允许的类型 @param {number|string|boolean|null} [array|...|-1]即任意数量，数字类型直接计数，其他类型 非空为1 空为0
 * usage:
 * -  getArgv({add: -1, powerfile: 1}, ["node", "add", "a.js", "b.js", "-fi=tty", "--powerfile", "./file"])
 * -> {$: ["node", "add"], add: ["a.js", "b.js"], f: true, i: "tty", powerfile: "./file"}
 * 
 * @param {object} [acceptParamKeys = {}] - eg: {Key: acceptParamLimit} && [] -1, b: 'array', c: '...', d: 1, e: 3}
 * @param {array<string>} [args = process.argv]
 * @return {object}
 */
function getArgv(acceptParamKeys, args){
	acceptParamKeys = acceptParamKeys || {};
	args = args || process.argv;
	var argvs = {
		'$$': args.slice(0, 2), // nodejs command-line args
		'$': [], // module args
	};
	args = args.slice(2);
	
	var lastKey, lastLimit;
	args.forEach(function(arg, i){
		var index, keys, value;
		if(arg.slice(0, 1) !== '-'){
			push(arg);
		}else{
			index = arg.indexOf('=');
			if(index > -1){
				value = arg.slice(index + 1);
				arg = arg.slice(0, index);
			}
			if(arg.slice(1, 2) === '-'){
				keys = [arg.slice(2)];
			}else{
				keys = arg.slice(1).split('');
			}
			keys.forEach(function(key){
				push(key, 1);
			});
			if(value != null){
				pushParam(keys[keys.length - 1], value, 1);
			}
		}
	});
	
	return argvs;
	
	function push(arg, isParam){
		if(isParam){
			argvs[arg] = true;
		}else if(lastKey != null){
			pushParam(lastKey, arg, lastLimit);
			if(lastLimit === 1 || (lastLimit > 1 && argvs[lastKey].length >= lastLimit)){
				lastKey = null;
			}
		}else{
			argvs.$.push(arg);
		}
		if(isParam || lastKey == null){
			lastKey = (lastLimit = getAcceptLimit(arg)) === 0 ? null : arg;
		}
	}
	
	function getAcceptLimit(key){
		var accpetType = acceptParamKeys[key];
		var accpetLimit = 0;
		if(['array', '...'].indexOf(accpetType) > -1){
			accpetLimit = -1;
		}else if(typeof accpetType === 'number'){
			accpetLimit = accpetType;
		}else if(accpetType){
			accpetLimit = 1;
		}
		return accpetLimit;
	}
	
	function pushParam(key, value, accpetLimit){
		if(accpetLimit === 1){
			argvs[key] = value;
		}else if(accpetLimit === -1 || accpetLimit > 1 ){
			if(argvs[key] == null || argvs[key].constructor !== Array){
				argvs[key] = [];
			}
			if(accpetLimit === -1 || argvs[key].length <= accpetLimit){
				argvs[key].push(value);
			}
		}
	}
}