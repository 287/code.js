//#!py
/**
 * @desc 
 * @include getTreeFromStringByTab eachNodeChilds splitStringWithinWrap serializeTree
 * @param {string} string
 * @param {object} [op]
 * @param {array} [op.singleTagNames = ['meta', 'link', 'img', 'input']]
 * @param {string} [op.tagNamePrefix = '']
 * @param {function} [op.parseTagName]
 * @return {string}
 */
function string2xml(string, op)
	let {parseTagName, tagNamePrefix, singleTagNames = ['meta', 'link', 'img', 'input', 'br']} = op || {}
	const tree = getTreeFromStringByTab(string)
	
	eachNodeChilds(tree, (node, conf)=> {
		if conf.index === 0
			return 
		
		let {content} = node
		content = content.replace(/\n\t*/g, ' ')
		
		if ['"', "'"].includes(content.charAt(0))
			node.textContent = content.slice(1, -1)
		else
			let tagName, cmds
		
			if !/\s/.test(content)
				tagName = content
			else
				[tagName, cmds] = splitStringWithinWrap(content, ' ', 1)
			
			if parseTagName
				tagName = parseTagName(tagName)
			else if tagNamePrefix != null
				tagName = tagNamePrefix + tagName
			
			node.tagName = tagName
			node.cmds = cmds
			node.selfClosing = singleTagNames.includes(tagName)
	})
	
	return serializeTree(tree, {
		getWrapStart: (node)=> {
			let {tagName, cmds, selfClosing, textContent} = node
			let closed = ''
			
			if !tagName
				return textContent
			if cmds != null
				cmds = ' ' + cmds
			if selfClosing
				closed = ' /'
				
			return `<${tagName}${cmds || ''}${closed}>`
		},
		getWrapEnd: (node)=> {
			const {tagName, selfClosing} = node
			if !tagName
				return null
				
			if selfClosing
				return null
				
			return `</${tagName}>`
		},
		removeRoot: true,
	})