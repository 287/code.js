/**
 * 编译css - 依赖tab或4个空格缩进层级，不支持单行声明(eg: body{margin:0})，支持单行多行注释，自动补全属性值结尾";"，支持写或不写"{"、"}"
 * @include trim splitSimple countLeadingTabs splitOnce toSnakeCase
 * @param {string} css
 * @param {object} [op = {}]
 * @param {boolean} [op.minify = false]
 * @param {boolean} [op.autopx = true]
 * @param {boolean} [op.debug = false]
 * @return {string}
 */
function parseCss(css, op){
	op = Object.assign({
		debug: false,
		minify: false,
		autopx: true,
	}, op);
	var cache = {};
	var statements = [];
	var propertys = {};
	var list = [];
	var line, curTabs, lastTabs, baseTabs;
	css = css.replace(/\r?\n/g, '\f');
	// remove multi line code commenting
	css = css.replace(/\/\*.*?\*\//g, '');
	css.split('\f').forEach(function(line, i){
		line = line.replace(/(\}|\{)\s*$/g, '');
		if(/^\s*$/.test(line)){
			return ;
		}
		curTabs = countLeadingTabs(line);
		line = trim(line);
		if(/^@/.test(line)){
			// line += line.slice(-1) === ';' ? '' : ';'
			return list.push(line)
		}
		if(line.slice(0, 2) === '//'){
			return ;
		}
		if(baseTabs === undefined){
			baseTabs = curTabs;
			lastTabs = 0;
		}
		curTabs -=  baseTabs;
		if(curTabs < lastTabs){
			for(var i = curTabs; i < lastTabs; i++){
				popStack(i);
			}
		}
		pushStack(curTabs, isStatement(line) ? line.split(',') : line);
		lastTabs = curTabs;
	});
	
	statements.forEach(function(item, i){
		popStack(i);
	});
	
	return toCss();
	
	function toCss(){
		var propertys;
		var css = '';
		for(var key in cache){
			propertys = cache[key];
			if(propertys == null) continue;
			list.push(key + ' {');
			propertys.forEach(function(item){
				if(op.autopx && /^(-?\d+(\s|$))*$/.test(item[1])){
					item[1] = item[1].replace(/(\d+)/g, '$1px');
				}
				item[0] = toSnakeCase(item[0], '-')
				item = item.join(op.minify ? ':' : ': ') ;
				item += item.slice(-1) !== ';' ? ';' : '';
				if(!op.minify){
					item = '\t' + item;
				}
				list.push(item);
			});
			list.push('}');
		}
		css = list.join(op.minify ? '' : '\n');
		if(op.debug){
			console.log(css);
		}
		return css;
	}
	
	function pushStack(tabs, item){
		if(typeof item === 'object'){
			item.forEach(function(name, i){
				item[i] = trim(name);
			});
			if(statements[tabs - 1]){
				item = addStatement(item, statements[tabs - 1]);
			}
			statements[tabs] = item;
		}else{
			propertys[tabs] = propertys[tabs] == null ? [] : propertys[tabs];
			item = splitOnce(item, ':');
			if(item.length === 1){
				return ;
			}else{
				item[0] = trim(item[0]);
				item[1] = trim(item[1]);
			}
			propertys[tabs].push(item);
		}
	}
	
	function popStack(tabs){
		if(statements[tabs] && propertys[tabs + 1]){
			cache[statements[tabs].join(', ')] = propertys[tabs + 1];
			statements[tabs] = null;
			propertys[tabs + 1] = null;
		}
	}
	
	function isStatement(str){
		return /::|&/.test(str) || !/:/.test(str) || /:(hover|active|first-child|last-child)/.test(str);
	}
	
	function addStatement(sList, pList){
		var list = []
		pList.forEach(function(pName){
			sList.forEach(function(sName){
				if(/&/.test(sName)){
					// debugger
					sName = sName.replace(/&/g, pName);
				}else{
					sName = pName + ' ' + sName;
				}
				list.push(sName);
			});
		});
		return list;
	}
}
