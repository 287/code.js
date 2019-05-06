//#!py
/**
 * @desc 
 * @include parseXtml createNode 
 * @return {element}
 */
function createNodeByXtml(xtml, op = {})
	const xml = parseXtml(xtml, {
		parseTagName(tagName, node)
			let originTagName = tagName
			let {attributeString} = node
			const added = []
			const classNames = []
			tagName = tagName.replace(/#(\w+)/, (t, str)=> added.push(`id="${str}"`) && '').replace(/\.([\w-]+)/ig, (t, str)=> classNames.push(str) && '')
			if classNames.length
				added.push(`class="${classNames.join(' ')}"`)
			
			if added.length
				node.attributeString = `${added.join(' ')} ${attributeString || ''}`
				
			if op.parseTagName
				if op.parseTagName(tagName, node)
					tagName = op.parseTagName(tagName, node)
					
			if tagName === ''
				tagName = originTagName
				
			return tagName
	})
	
	return createNode(xml)