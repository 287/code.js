//#!py
/**
 * @include createNodeByXtml parseCss createStyleNode randomString
 */
function parseTplNodeByString(str, name)
	const scopeKey = 'scope'
	const scopeValue = name || randomString(5)
	
	const tree = getTreeFromStringByTab(str)
	
	let cssNode
	for tree.childs as node, i
		if /^style(\W|$)/.test(node.content)
			cssNode = node
			tree.childs.splice(i--, 1)
	
	const node = createNodeByXtml(tree)
	if node
		node.setAttribute(scopeKey, scopeValue)
		
		if cssNode
			cssNode.childs.push({
				content: `[${scopeKey}=${scopeValue}]`,
				childs: cssNode.childs.splice(0)
			})
		
			const css = parseCss(cssNode)
			const styleNode = createStyleNode(css)
			styleNode.setAttribute(scopeKey, scopeValue)
		
			node.styleNode = styleNode
	
	return node