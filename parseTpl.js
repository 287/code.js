/**
 * echo command like {::title:}
 * logic command like {:if title:}{::title:}{:if:}
 * commands: if for each while switch 
 * 
 * @include parseTemplate, escapeRegexpString, splitOnce, splitSimple, each, getType, trim
 * @param {string} tpl - template string. use "{:if data:} <ul></ul> {:if:}" to write logical statement and use "{::title:}" to echo string
 * @param {object} [o] - template data object
 * @param {object} [op] - parseTemplate option
 * @param {function} [op.beforeInclude] - beforeInclude({string} name) return compiled
 * @return {string}
 */
function parseTpl(tpl, o, op){
	var tagsDefault = ['{:', ':}'];
	
	op = Object.assign({
		tags: tagsDefault,
		matcher: {
			beforeCmd: /\f\s*(\{:)(?!:)/g,
			betweenCmd: /(^|:\}).*?(\{:|$)/g,
			cmd: /\{:(.*?):\}/g,
		},
		cache: {},
		params: {
			_StR: function(value){
				return value == null ? '' : value;
			},
			each: each,
			getType: getType,
			trim: trim,
		},
		parseEcho: function(cmd){
			cmd = "''; try{ _OuT += _StR(" + cmd + "); }catch(e){ _OpT.log(e); }";
			return cmd;
		},
		parseCommand: function(cmd){
			var keywords = ['else', 'each', 'if', 'for', 'switch', 'while'];
			var commentKeys = ['//', '/*', '*/'];
			var matchKeyRegx = /^(include|each|for|if|else if|switch|while|break case|break default|break|continue|return|case|default)\s*(?!\()/;
			var keywordTexts = {
				each: '})',
				else: '} else {',
			};
			var catchMark = 0; //* 0: off, 1: before, 2: after, 3: before and after
			var i;
			cmd = trim(cmd);
			
			if((i = keywords.indexOf(cmd)) > -1){
				cmd = keywordTexts[cmd] || '}';
				if(i > 0){
					catchMark = 2;
				}
			}else if((i = commentKeys.indexOf(cmd.slice(0, 2))) > -1){
				switch(i){
					case 0:
						cmd = commentKeys[1] + cmd.slice(2) + commentKeys[2];
					break; case 1:
						cmd = cmd;
					break; case 2:
						cmd = cmd.slice(0, 2) + [i];
				}
			}else if(i = cmd.match(matchKeyRegx)){
				var key = i[1];
				cmd = cmd.slice(key.length + 1);
				
				if(['include'].indexOf(key) > -1){
					var names = splitSimple(cmd);
					var contents = [];
					if(names && names.length){
						names.forEach(function(name){
							var content = op.cache[name];
							if(content == null && op.beforeInclude){
								content = op.beforeInclude(name, op);
							}
							contents.push(content || '');
						});
					}
					cmd = '/* include < */' + contents.join('\n/* --- */\n') + '/* > include */';
					
				}else if(['break', 'continue', 'return'].indexOf(key) > -1){
					cmd = key + ' ' + cmd + ';';
					
				}else if(['case', 'default', 'break case', 'break default'].indexOf(key) > -1){
					cmd = key.replace(' ', '; ') + ' ' + cmd + ':';
					
				}else if((i = ['else if', 'if', 'switch', 'while'].indexOf(key)) > -1){
					cmd = (i === 0 ? '} ' : '') + key + '( ' + cmd + ' ){';
					if(i > 0){
						catchMark = 1;
					}
					
				}else if(['each', 'for'].indexOf(key) > -1){
					var ifcmd, tmp, objectcmd, valuecmd;
					
					tmp = splitOnce(cmd, ' if ');
					cmd = tmp[0];
					ifcmd = tmp[1];
					
					if(ifcmd == null || ifcmd === ''){
						ifcmd = '';
					}else{
						ifcmd = ' if(!( ' + ifcmd + ' )) '  + (key === 'each' ? 'return ' : 'continue') + ';';
					}
					
					if(key === 'for'){
						cmd = key + '( ' + cmd + ' ){' + ifcmd;
					}else{
						tmp = splitOnce(cmd, ' as ');
						objectcmd = tmp[0];
						valuecmd = tmp[1];
						cmd = 'each(' + objectcmd + ', function( ' + valuecmd + ' ){' + ifcmd;
					}
					catchMark = 1;
				}
			}else{
				catchMark = 3;
			}
		
			//* add try catch
			switch(catchMark){
				case 1:
					cmd = "try{ " + cmd;
				break; case 2:
					cmd += " }catch(err){ _OpT.log(err); }";
				break; case 3:
					cmd = "try{ " + cmd + " }catch(e){ _OpT.log(e); }";
			}
			
			return cmd;
		}
	}, op);
	
	if(op.tags !== tagsDefault){
		var tagsd = [escapeRegexpString(op.tags[0]), escapeRegexpString(op.tags[1])];
		op.matcher = {
			beforeCmd: new RegExp('\\f\\s*(' + tagsd[0] +')(?!:)', 'g'),
			betweenCmd: new RegExp('(^|' + tagsd[1] +').*?(' + tagsd[0] +'|$)', 'g'),
			cmd: new RegExp(tagsd[0] + '(.*?)' + tagsd[1], 'g'),
		};
	}
	
	return parseTemplate(tpl, o, op);
}