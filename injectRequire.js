//#!py
/**
 * @require fs
 * @include stripBOM getParsers
 * @return {undefined}
 */
function injectRequire()
	if module.addParser
		return
		
	const Module = module.constructor
	const proto = Module.prototype
	
	proto.addParser = addParser
	proto.hasParser = hasParser
	proto.removeParser = removeParser
	
	const extensions = Module._extensions
	const parsers = Module._parsers = {}
	const baks = Module._extensions_bak = {}
	
	// 运行parser
	function runParse(name, content, filename, module)
		const item = parsers[name]
		if item
			content = item.parser(content, filename, module)
		return content
	
	// 初始化 parser 至 extensions
	function initParser(module, filename)
		// const fs = require('fs')
		let content = fs.readFileSync(filename, 'utf8')
		content = stripBOM(content)
		
		const parserNames = getParsers(content)
		module.parserNames = parserNames
		
		content = runParse('*', content, filename, module)
		
		if parserNames.length > 0
			parserNames.forEach((name)=>{
				content = runParse(name, content, filename, module)
			})
			
		module._compile(content, filename)
	
	function isBackup(extname)
		return !!baks[extname]
		
	function backup(extname)
		if isBackup(extname)
			return 
		baks[extname] = extensions[extname]
		extensions[extname] = initParser
		
	/**
	 * @param {string} name
	 * @param {array<string>} extnames
	 * @param {function} parser
	 * @return {undefined}
	 */
	function addParser(name, extnames, parser)
		if hasParser(name)
			return
		
		extnames.forEach((extname)=> backup(extname))
		
		parsers[name] = {
			extnames,
			parser,
		}
		
	function hasParser(name)
		return !!parsers[name]
		
	function removeParser(name)
		-