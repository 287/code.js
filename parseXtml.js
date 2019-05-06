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
function parseXtml(string, op)
	let {parseTagName, tagNamePrefix, singleTagNames = ['!doctype', 'meta', 'link', 'img', 'input', 'br']} = op || {}
	
	const tree = getTreeFromStringByTab(string)
	
	eachNodeChilds(tree, (node, conf)=> {
		if conf.index === 0
			return 
		
		let {content} = node
		content = content.replace(/\n\t*/g, ' ')
		
		if ['"', "'"].includes(content.charAt(0))
			node.textContent = content.slice(1, -1)
		else
			let tagName, attributeString = ''
		
			if !/\s/.test(content)
				tagName = content
			else
				[tagName, attributeString] = splitStringWithinWrap(content, ' ', 1)
			
			node.attributeString = attributeString
			
			if parseTagName
				tagName = parseTagName(tagName, node)
			else if tagNamePrefix != null
				tagName = tagNamePrefix + tagName
			
			node.tagName = tagName
			node.selfClosing = singleTagNames.includes(tagName)
	})
	
	return serializeTree(tree, {
		getWrapStart: (node)=> {
			let {tagName, attributeString, selfClosing, textContent} = node
			let closed = ''
			
			if !tagName
				return textContent
			/**
			 * @include isNonemptyString
			 */
			if isNonemptyString(attributeString)
				attributeString = ' ' + attributeString
			// if selfClosing
				// closed = ' /'
				
			return `<${tagName}${attributeString || ''}${closed}>`
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
		withTab: false,
		sep: '',
	})