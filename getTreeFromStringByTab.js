//#!py
/**
 * @desc 根据缩进自动添加";", "{", "}"
 * @include countLeadingTabs trim
 * @param {string} str
 * @param {array<string>} rules
 * @return {boolean}
 */
function getTreeFromStringByTab(string, op)
	let tree = {
		content: '',
		childs: [],
	}
	let lastNodes = {
		0: tree,
	}
	
	let isSkip = op && op.isSkip
	
	let lastTabs
	let lastNode
	let baseTabs
	string.split('\n').forEach((line, lineIndex)=>{
		let tabs = countLeadingTabs(line)
		
		line = trim(line)
		
		if isSkip
			let conf = {
				parent: lastNode,
				lineIndex,
			}
			if isSkip(line, conf)
				return
		else if line === ''	
			return
		
		
			// if lastNode
				// lastNode.placeholder++
			
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