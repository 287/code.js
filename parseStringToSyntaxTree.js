//#!py
/**
 * @include nestedBlockWraps stringBlockWraps multiLineCommentWrap
 */
function parseStringToSyntaxTree(string, op = {removeBlankLine: true})
	const allMatchs = {
		operator: ['+', '-', '*', '/', '|', '&', '?', ':', '='],
		symbel: ['.', ',', ';'],
		ln: ['\n'],
		tab: ['\t'],
		blank: [/\s/],
		literal: [/\w/],
	}
	
	const allWraps = {
		comment: [multiLineCommentWrap, ['//', '\n']],
		regexp: ['//\\'],
		string: stringBlockWraps,
		nesting: nestedBlockWraps,
	}

	const tree = {
		subtype: 'nesting',
		children: [],
	}
	const stackNodes = [tree]
	const blockNodes = [{
		content: '',
		level: 0,
		children: [],
	}]
	
	let blockNode = stackNodes[0]
	let lastNode
	let lineIndex = 0
	
	for string as chr i
		if blockNode.wrap !== undefined
			if isMatchStringWrapWithIndex(string, chr, i, blockNode.wrap, 1)
				blockNode.end = i
				i += blockNode.wrap[1].length - 1
				// if blockNode.subtype === 'nesting'
				stackNodes.pop()
				blockNode = stackNodes[stackNodes.length - 1]
				lastNode = null
				continue
				
		if blockNode.subtype && blockNode.subtype !== 'nesting'
			blockNode.content += chr
				
		else if match = matchWrap(string, chr, i, allWraps)
			const [type, wrap] = match
			const node = {
				type: 'block',
				start: i + wrap[0].length,
				wrap,
				subtype: type,
				lineIndex,
			}
			
			if type === 'nesting'
				node.children = []
			else
				node.content = ''
				// stackNodes.push(node)
				// content: '',
				// children: [],
			
			i += wrap[0].length - 1
			
			lastNode = null
			// if blockNode.subtype === 'nesting'
				// blockNode.children.push(node)
			blockNode.children.push(node)
				
			// if type === 'nesting'
				// stackNodes.push(node)
			stackNodes.push(node)
				
			blockNode = node
			
		else if match = matchBlock(string, chr, i, allMatchs)
			const [type, matchString] = match
			
			if type === 'ln'
				let noBlankLine
				let count = 0
				for blockNode.children as node i step -1
					if node.type === 'blank' || node.type === 'tab'
						count++
					else if node.type === 'ln'
						lastNode = node
						break
					else
						noBlankLine = true
						break
						
				if !noBlankLine && count
					blockNode.children.splice(blockNode.children.length - count, count)
						
							
							
			// if type === 'blank'
				// lastNode = null
				// continue
			
			i += matchString.length - 1
			
			if lastNode && lastNode.type === type
				lastNode.content += matchString
				lastNode.end += matchString.length
				if ['ln', 'tab'].includes(node.type)
					node
			else
				const matchNode = {
					type: type,
					start: i,
					end: i + matchString.length,
					content: matchString,
					lineIndex,
				}
				
				lastNode = matchNode
				
				blockNode.children.push(matchNode)
			
			
			if type === 'ln'
				lineIndex++
				
				
			// const parent = stackNodes.length && stackNodes[stackNodes.length - 1] : tree
			// const lastNode = parent.children[parent.children.length - 1]
			// if lastNode
			// .push(matchNode)
			// parent.children.push(matchNode)
			
		
	
	return tree
	
	
	function matchWrap(string, chr, i, allWraps)
		for allWraps as wraps wrapType -
			for wraps as wrap -
				if isMatchStringWrapWithIndex(string, chr, i, wrap, 0)
					return [wrapType, wrap]
	
	
	function matchBlock(string, chr, i, allMatchs)
		for allMatchs as matchs type -
			for matchs as match -
				/**
				 * @include isString
				 */
				if isString(match)
					if isMatchStringWithIndex(string, chr, i, match)
						return [type, match]
				else
					if match.test(chr)
						return [type, chr]
						
	
	function isMatchStringWrapWithIndex(string, chr, i, wrap, wrapIndex, startsIndex = 0)
		const match = wrap[wrapIndex]
		
		if isMatchStringWithIndex(string, chr, i, match)
			if wrapIndex === 0
				return true
			
			const escapeKey = wrap[2]
			if escapeKey
				if escapeKey === match
					if string.slice(i + match.length, i + match.length + escapeKey.length) !== escapeKey
						return true
				else
					if string.slice(Math.max(i - escapeKey.length, startsIndex), i) !== escapeKey
						return true
			else
				return true
							
		return false
	
	
	function isMatchStringWithIndex(string, chr, i, match)
		if match.charAt(0) === chr
			if string.slice(i, i + match.length) === match
				return true
				
		return false