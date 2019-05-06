//#!py
/**
 * @desc 根据缩进自动添加";", "{", "}"
 * @include countLeadingTabs trim
 * @param {string} str
 * @param {array<string>} rules
 * @return {boolean}
 */
function getTreeFromStringByTab(string, op)
	if string.childs
		return string
		
	op = Object.assign({
		isSkip: null,
		removeBlankLine: true,
		removeSingleLineComment: true,
		removeMultiLineComment: true,
	}, op)
	
	if op.removeMultiLineComment
		string = string.replace(/\/\*[^]*\*\//g, '')
	
	let tree = {
		content: '',
		childs: [],
	}
	let lastNodes = {
		0: tree,
	}
	
	let isSkip = op && op.isSkip
	let skipByDoubleSlash = op && op.isSkip
	
	let lastTabs
	let lastNode
	let baseTabs
	string.split('\n').forEach((line, lineIndex)=>{
		let tabs = countLeadingTabs(line)
		
		line = trim(line)
		
		if op.removeBlankLine && line === ''
			return
		
		if op.removeSingleLineComment && line.startsWith('//')
			return
			
		if op.isSkip
			let conf = {
				parent: lastNode,
				lineIndex,
			}
			if op.isSkip(line, conf)
				return
			
		if baseTabs == null
			baseTabs = tabs
			
		tabs -= baseTabs
			
		if tabs >= lastTabs + 2
			lastNode.content += '\n' + '\t'.repeat(tabs) + line
			return
		
		lastTabs = tabs
		
		lastNode = addChild(tabs, {
			content: line,
			placeholder: 0,
			lineIndex,
			tabs,
		})
	})
	
	return tree
	
	
	// function addChild(level, wrapper)
	
	function addChild(level, node)
		let pNode = lastNodes[level]
		node.childs = []
		pNode.childs.push(node)
		
		lastNodes[level + 1] = node
		return node