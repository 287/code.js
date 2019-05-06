//#!py
/**
 * @include createNodeByXtml parseCss createStyleNode randomString
 */
function createNodeByCpt(str, name)
	const scopeKey = 'cpt'
	const scopeValue = name || randomString(5)
	
	const tree = getTreeFromStringByTab(str)
	
	let cssNode
	let jsNode
	for tree.childs as node, i
		if /^style(\W|$)/.test(node.content)
			cssNode = node
			tree.childs.splice(i--, 1)
	
	const node = createNodeByXtml(tree, {
		parseTagName(tagName, node)
			if tagName.includes('/')
				node.attributeString = `is="${tagName}" ${node.attributeString}`
				tagName = 'component'
			return tagName
	})
	
	if node
		if name || cssNode
			node.setAttribute(scopeKey, scopeValue)
		
		if cssNode
			cssNode.childs.push({
				content: `[${scopeKey}="${scopeValue}"]`,
				childs: cssNode.childs.splice(0)
			})
		
			const css = parseCss(cssNode, {minify: true})
			const styleNode = createStyleNode(css)
			styleNode.setAttribute(scopeKey, scopeValue)
		
			node.styleNode = styleNode
			
			if document.head
				document.head.append(node.styleNode)
	
	return node