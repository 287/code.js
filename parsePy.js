/**
 * @desc 根据缩进自动添加";", "{", "}"
 * @include replaceStringByMark countLeadingTabs countChar trim isStringStartsWith
 * @param {string} str
 * @param {array<string>} rules
 * @return {boolean}
 */
function parsePy(tpl){
	// 提取多行字符串
	let [str, marks, mark] = replaceStringByMark(tpl, ['`']);
	
	// 转义
	str = str.replace(/\r?\n/g, '\f');
	
	// 提取多行注释
	str = str.replace(/(\s|^)(\/\*.*?\*\/)/g, (t, p, m)=>{
		marks.push(m.replace(/\f/g, '\n'));
		return p + mark[0] + (marks.length - 1) + mark[1];
	});
	
	let lines = str.split(/\f/);
	let addeds = [];
	let baseTabs;
	let lastTabs = 0;
	let lastIndex;
	let wrapEnd = null;
	let indexLines = {};
	
	const lineStartCommands = ['if', 'else if', 'switch', 'while', 'for', 'with', 'catch'].map(v=> v + ' ');
	const lineStartChars = ['.', '#'];
	const lineEndChars = [';', '{', '[', ',', ':', '(', mark[1]];
	
	const codeLines = []
	
	// 提取需要转义的行
	for(let i = 0, l = lines.length; i < l; i++){
		let line = lines[i];
		let tabCount = countLeadingTabs(line);
		line = trim(line);
		
		// 单行注释
		if(isStringStartsWiths(line, ['//', '#'])){
			continue ;
		}
		
		// 空行
		if(line === ''){
			continue ;
		}
		
		let lastCodeLine = codeLines[codeLines.length - 1];
		if(lastCodeLine && tabCount === lastCodeLine.tabCount + 2){
			lastCodeLine.line += '\v' + line;
			lastCodeLine.breakLine = true;
			lines[i] = null;
			continue;
		}
		
		codeLines.push({
			line,
			tabCount,
			index: i,
			breakLine: false,
		})
		
		lines[i] = null;
	}
	
	for(let i = 0, l = codeLines.length; i < l; i++){
		let {line, tabCount, index, breakLine} = codeLines[i];
		/*
			indent: 0 
			indent: 1 indent 缩进
			indent: -1 unindnt 反向缩进
			indent: 2 break 折行
			indent: -2 exit
		*/
		
		if(baseTabs == null){
			baseTabs = lastTabs = tabCount;
		}
		// let nextItem = lines[i + 1] || {}
		// let nextTabs = nextItem.tabCount
		let indent = tabCount - lastTabs;
		
		// 匹配占位符
		if(line === '-'){
			line = '';
		}
		
		// 命令补齐
		{
			if(isStringStartsWiths(line, lineStartCommands) && !isStringEndsWiths(line, [';', '}'])){
				let index = line.indexOf(' ');
				index += line.slice(0, index) === 'else' ? 3 : 0;
				line = line.slice(0, index) + '(' + line.slice(index + 1) + ')';
			}
			if((line === 'default' || isStringStartsWiths(line, ['case '])) && !isStringEndsWiths(line, [':'])){
				line += ':';
			}
		}
		
		let added = [
			'\t'.repeat(tabCount),	// tab
			'',	// prefix str
			'',	// subfix str
			''	// section str
		];
		
		let lastAdded = addeds[lastIndex] || [];
		let lastLine = lines[lastIndex];
		let lastIndexLine = indexLines[tabCount];
		
		if(indent === 0){
			addLineEnd(line, added);
			
		}else if(indent === 1){
			// 缩进
			addLineEnd(lastLine, lastAdded, '{');
			addLineEnd(line, added);
			
		}else if(indent < 0){
			// 反向缩进
			let notLineIndent = false;
			let isWrapEnd = false;
			if(/^(\}|\]|case |default|\))/.test(line)){
				isWrapEnd = true;
			}else if(lineStartChars.includes(lastLine.slice(0, 1))){
				notLineIndent = true;
			}
			
			if(isWrapEnd && indent === -1){
				lastAdded[2] = '';
			}else{
				addLineEnd(line, added);
				
				let wrapEnd = createWrapEnd(-indent - isWrapEnd - notLineIndent, tabCount + isWrapEnd);
				if(/^(else|catch)[\W]?/.test(line)){
					added[1] = wrapEnd.slice(1 + added[0].length);
				}else{
					lastAdded[3] = wrapEnd;
				}
			}
		}else{
			// 同行折行
			tabCount = lastTabs;
			
			if(lastLine.slice(-1) === ')'){
				lines[lastIndex] = lastLine.slice(0, -1);
			}
			line += ')';
			lastAdded[2] = '';
		}
		
		if(lineStartChars.includes(line.slice(0, 1))){
			lastAdded[2] = '';
		}
		
		// 还原折行
		if(breakLine){
			line = line.replace(/\v/g, '\n' + '\t'.repeat(tabCount + 2))
		}
		
		lines[index] = line;
		addeds[index] = added;
		lastIndex = index;
		lastTabs = tabCount;
		indexLines[tabCount] = line;
	}
	
	addeds[lastIndex][3] = createWrapEnd(lastTabs - baseTabs, baseTabs);
	
	lines = lines.map((line, i)=> {
		line = line == null ? '' : line;
		let added = addeds[i];
		if(added){
			line = added[0] + added[1] + line + added[2] + added[3];
		}
		return line;
	});
	
	return lines.join('\n').replace(/<-(\d+)->/g, (t, index)=> marks[index]);
	
	function createWrapEnd(level, base = 0, ln = true){
		let add = '';
		
		ln = ln ? '\n' : ''
		for(let i = level; i > 0; i--){
			let index = i - 1 + base;
			let wrapEnd = ln + '\t'.repeat(index) + '}';
			let lastAlignLine = indexLines[index];
			if(lastAlignLine && /^(default|case)(\W|$)/.test(lastAlignLine)){
				continue;
			}
			add += wrapEnd;
		}
		return add;
	}
	
	/**
	 * @include isStringStartsWiths isStringEndsWiths
	 */
	function addLineEnd(line, added, end = ';'){
		if(!isStringStartsWiths(line, lineStartChars) && !isStringEndsWiths(line, lineEndChars)){
			added[2] = end;
		}
	}
}
