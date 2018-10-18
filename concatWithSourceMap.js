/**
 * @require source-map:SourceMap
 * @include isArray, isNonemptyString, toUnixPath, stringCountIndex, isBuffer, isString, isPureNumber, addTabs, replaceStringByMark
 * @param {array<array<string>|string>} concats - [[content, path, indent, originSourceMap], [content, path]] or [[content, path], content, content]
 * @param {object} [op]
 * @param {string} [op.sep = '\n']
 * @param {string} [op.file = '']
 * @param {boolean} [op.sourceMap = true]
 * @param {boolean} [op.inlineSourceMap = false]
 * @param {string} [op.sourceRoot = '']
 * @return {object} - [content, sourcemap]
 * *********************************************
 * concat item args: content[, path][, indent][, originSourceMap] - 顺序无所谓
 * *********************************************
 */
function concatWithSourceMap(concats, op){
	op = Object.assign({
		sep: '\n',
		file: '',
		inlineSourceMap: false,
		sourceMap: null,
		sourceRoot: '',
		indent: 0,
	}, op);
	if(op.inlineSourceMap && op.sourceMap == null){
		op.sourceMap = true;
	}
	
	const rs = ['', ''];
	const contents = [];
	const params = [];
	{
		concats.forEach((item)=> {
			item = isArray(item) ? item : [item];
			let [content] = item;
			if(!isNonemptyString(content)){
				return;
			}
			let indent = op.indent, sourceMap, path;
			item.slice(1).forEach((arg, i)=> {
				if(isPureNumber(arg)){
					indent += arg;
				}else if(isString(arg)){
					if(path === undefined && arg.charAt(0) !== '{'){
						path = arg;
					}else{
						sourceMap = JSON.parse(arg);
					}
				}
			});
			content = content.toString();
			if(indent > 0){
				let marks;
				[content, marks] = replaceStringByMark(content, ['`']);
				content = addTabs(content, indent);
				if(marks.length){
					content = content.replace(/<-(\d+)->/g, (t, d)=>{
						return marks[d];
					});
				}
			}
			contents.push(content);
			params.push([path, sourceMap, indent]);
		});
		
		concats = null;
	}
	
	if(!op.sourceMap || typeof SourceMap === 'undefined'){
		rs[0] = contents.join(op.sep);
	}else{
		op.file = toUnixPath(op.file);
		// const SourceMap = require('source-map');
		const SourceMapGenerator = SourceMap.SourceMapGenerator;
		const SourceMapConsumer = SourceMap.SourceMapConsumer;
		
		const target = {
			sep: op.sep,
			lineOffset: 0,
			columnOffset: 0,
			sepLineOffset: 0,
			sepColOffset: 0,
			contents: [],
			sourceMap: new SourceMapGenerator(op),
			SourceMapConsumer,
		};
		{
			let sepString = op.sep;
			let indexs = stringCountIndex(sepString, '\n');
			if(indexs.length > 0){
				target.sepLineOffset += indexs.length;
				target.sepColOffset += sepString.slice(indexs[indexs.length - 1] + 1).length;
			}
		}
		
		contents.forEach((content, i)=>{
			addContent(target, content, ...params[i]);
		});
		
		rs[0] = target.contents.join('');
		
		let sourceMap = target.sourceMap.toString();
		if(op.inlineSourceMap){
			sourceMap = `//# sourceMappingURL=data:application/json;base64,${Buffer.from(sourceMap).toString('base64')}`;
		}
		rs[1] = sourceMap;
	}
	
	return rs;
	
	function addContent(target, content, filePath, sourceMap, indent){
		filePath = filePath && toUnixPath(filePath);
		
		let lines = stringCountIndex(content, '\n').length + 1;
		
		if(target.contents.length !== 0){
			target.contents.push(target.sep);
		}
		target.contents.push(content);
		
		if(sourceMap && sourceMap.mappings && sourceMap.mappings.length > 0){
			const originSourceMap = new target.SourceMapConsumer(sourceMap);
			originSourceMap.eachMapping((mapping)=> {
				if(mapping.source){
					target.sourceMap.addMapping({
						generated: {
						  line: target.lineOffset + mapping.generatedLine,
						  column: (mapping.generatedLine === 1 ? target.columnOffset : 0) + mapping.generatedColumn,
						},
						original: {
						  line: mapping.originalLine,
						  column: mapping.originalColumn,
						},
						source: mapping.source,
						name: mapping.name,
					});
				}
			});
			if(sourceMap.sourcesContent){
				sourceMap.sourcesContent.forEach((sourceContent, i)=> {
					target.sourceMap.setSourceContent(sourceMap.sources[i], sourceContent);
				});
			}
		}else{
			if(sourceMap && sourceMap.sources && sourceMap.sources.length > 0){
				filePath = sourceMap.sources[0];
			}
			if(filePath){
				for(let i = 1; i <= lines; i++){
					target.sourceMap.addMapping({
						generated: {
							line: target.lineOffset + i,
							column: (i === 1 ? target.columnOffset : 0),
						},
						original: {
							line: i,
							column: 0,
						},
						source: filePath,
					});
				}
				if(sourceMap && sourceMap.sourcesContent){
					target.sourceMap.setSourceContent(filePath, sourceMap.sourcesContent[0]);
				}
			}
		}
	
		if(lines > 1){
			target.columnOffset = 0;
		}
		if(target.sepLineOffset === 0){
			target.columnOffset += content.length - Math.max(0, content.lastIndexOf('\n') + 1);
		}
		target.columnOffset += target.sepColOffset;
		target.lineOffset += lines - 1 + target.sepLineOffset;
	}
}