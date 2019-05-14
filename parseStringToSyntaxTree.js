//#!py
/**
 * @include nestedBlockWraps stringBlockWraps multiLineCommentWrap
 */
function parseStringToSyntaxTree(string, op)
	const allMatchs = {
		operator: ['+', '-', '*', '/', '|', '?', ':', '='],
		symbel: [',', ';'],
		ln: ['\n'],
		blank: [/\s/],
		literal: [/\w/],
	}
	
	const allWraps = {
		nesting: nestedBlockWraps,
		string: stringBlockWraps,
		comment: [multiLineCommentWrap],
	}

	const tree = {
		children: [],
	}
	const stackNodes = []
	const blockNodes = [{
		content: '',
		level: 0,
		children: [],
	}]
	
	for string as chr i
		if stackNodes.length
			const blockNode = stackNodes[stackNodes.length - 1]
			if blockNode.end === undefined
				if isMatchStringWrapWithIndex(string, i, blockNode.wrap, 1)
					blockNode.end = i
					stackNodes.pop()
					continue
				
					
		let blockType
		let blockWrap
		for allWraps as wraps wrapType -
			if blockWrap
				break
			for wraps as wrap -
				if isMatchStringWrapWithIndex(string, i, wrap, 0)
					blockType = wrapType
					blockWrap = wrap
					break
		
		
		if blockType
			const blockNode = {
				type: 'block',
				start: i + blockWrap[0].length,
				wrap: blockWrap,
			}
			stackNodes.push(blockNode)
			continue
					
		
		let matchType
		let matchString
		for allMatchs as matchs type -
			if matchType
				break
			
			for matchs as match -
				/**
				 * @include isString
				 */
				if isString(match)
					if isMatchStringWithIndex(string, i, match)
						matchString = match
						matchType = type
						break
				else
					if match.test(chr)
						matchType = type
						matchString = chr
						break
					
		const matchNode = {
			type: matchType,
			start: i,
			end: i + matchString.length,
			content: matchString
		}
		
		i += matchString.length - 1
		
		stackNodes.push(matchNode)
		
		
	
	return tree
	
	
	function isMatchStringWithIndex(string, i, match)
		if string.charAt(i) === match.charAt(0)
			if string.slice(i, i + match.length) === match
				return true
				
		return false
	
	function isMatchStringWrapWithIndex(string, i, wrap, wrapIndex, startsIndex)
		const match = wrap[wrapIndex]
		
		if string.charAt(i) === match.charAt(0)
			if string.slice(i, i + match.length) === match
			
				if wrapIndex === 0
					return true
				
				const escapeKey = wrap[2]
				if escapeKey
					if escapeKey === match
						if string.slice(i + match.length, i + match.length + escapeKey.length) === escapeKey
							return true
					else
						if string.slice(Math.max(i - escapeKey.length, startsIndex), i) === escapeKey
							return true
							
		return false
		
console.log(parseStringToSyntaxTree(`
a = ((a)+(b) * (c))
`))