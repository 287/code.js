/**
 * @param {string} tpl - template string
 * @param {object} o - template data object
 * @param {object} [op]
 * @param {array<string>} [op.tags = ['<:', ':>']]
 * @param {object} [op.matcher]
 * @param {object} [op.params]
 * @param {object} [op.context]
 * @param {function} [op.parseEcho]
 * @param {function} [op.parseCommand]
 * @param {function} [op.log]
 * @param {boolean} [op.justCompile = false]
 * @param {boolean} [op.debug = false] - allow throw syntax error
 * @param {boolean} [op.debugger = false] - debugger before parse
 * @return {string}
 */
function parseTemplate(tpl, o, op){
	var rs;
	tpl = tpl == null ? '' : tpl;
	op = Object.assign({
		logError: 1,
		tags: ['<:', ':>'],
		matcher: {
			beforeCmd: /\f\s*(<:)(?!:)/g,
			betweenCmd: /(^|:>).*?(<:|$)/g,
			cmd: /<:(.*?):>/g,
		},
		log: function(err){
			(op.debug || op.debugger) && (console.warn || console.log)(err);
		},
	}, op);
	
	if(tpl.indexOf(op.tags[0]) === -1){
		rs = op.justCompile ? "_OuT += '" + tpl.replace(/\r?(\n)/g, '\\$1') + "';" : tpl;
	}else{
		tpl = compile(tpl, op);
		if(op.justCompile){
			rs = tpl;
			build(tpl) || (rs = '');
		}else{
			rs = parse(tpl, o, op);
		}
	}
	
	return rs;
	
	function compile(tpl, op){
		tpl = tpl.replace(/\r?\n/g, '\f');
		
		//* 清除非显示命令的语句行前的空白字符
		tpl = tpl.replace(op.matcher.beforeCmd, '$1');
		
		//* 转义"'"，显示换行便于调试
		tpl = tpl.replace(op.matcher.betweenCmd, function(m){
			return m.replace(/'/g, '\\\'').replace(/(\f)/g, '$1\\\n');
		});
		
		//* 匹配命令
		tpl = tpl.replace(op.matcher.cmd, function(t, m){
			if(m.charAt(0) === ':'){
				m = m.slice(1);
				m = op.parseEcho ? op.parseEcho(m) : m;
				m = "_OuT += " + m + ";";
			}else{
				m = op.parseCommand ? op.parseCommand(m) : m + ';';
			}
			return "'; " + m + " _OuT += '";
		});

		//* 移除switch和第一个case中间的多余字符
		tpl = tpl.replace(/('; switch\(.*?\{).*?\n?(\s*).*?'; (case )/g, '$1\n$2$3');
		//* 完整
		tpl = "_OuT += '" + tpl + "';";
		//* 移除无用字符
		tpl = tpl.replace(/_OuT \+= '';/g, '');
		
		return tpl;
	}
	
	function build(tpl){
		var fn;
		if(op.debug){
			fn = Function('_ObJ', tpl);
		}else{
			try{
				fn = Function('_ObJ', tpl);
			}catch(err){
				op.log(err);
			}
		}
		return fn;
	}
	
	function parse(tpl, o, op){
		var rs = '';
		if(tpl !== ''){
			var params = Object.assign({
				_OuT: '',
				_TmP: '',
				_OpT: op,
			}, o, op.params);
			var keys = [];
			var fn;
			for(var key in params){
				keys.push(key + " = _ObJ." + key + "");
			}
		
			tpl = "'use strict'; var " + keys.join(', ') + "; if(_OpT.debugger) debugger; /* < */" + '' + tpl + " /* > */ return _OuT;";
			
			if(fn = build(tpl)){
				try{
					rs = fn.call(op.context, params);
					rs = rs.replace(/\f/g, '\n');
				}catch(err){
					op.log(err);
				}
			}
		}
		return rs;
	}
}