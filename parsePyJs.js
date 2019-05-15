//#!py
/**
 * @include nestedBlockWraps
 * @include parseStringToSyntaxTree serializeTree eachChildren
 */
function parsePyJs(string, op)
	const keywords = ['const', 'let', 'var']
	const logicKeys = ['if', 'for', 'while', 'with', 'try', 'catch']


	const tree = parseStringToSyntaxTree(string)
	
	let currentLineTabs = 0
	eachChildren(tree, (node, conf)=> {
		
		if conf.subindex === 0 || 
		if node.type === 'tab'
			const prevNode = conf.siblings[conf.subindex - 1]
			if !prevNode || prevNode.type === 'tab'
				currentLineTabs = node.count
		
			
			
		if node.type === 'literal'
			if logicKeys.includes(node.content)
				let start, end, blockNode
				for conf.subindex + 1 to conf.siblings as sibling i
					if sibling.type === 'ln'
						if end === undefined
							end = i
						break
					else if sibling.type === 'block' && sibling.wrap[0] === '('
						blockNode = sibling
						break
					else if sibling.type === 'blank'
						continue
					else
						if start === undefined
							start = i
				if start !== undefined
					if end === undefined
						end = sibling.length - 1
					
					blockNode = {
						type: 'block',
						subtype: 'nesting',
						// start: children[0].start,
						// end: children[children.length - 1].end,
						children: null,
						wrap: nestedBlockWraps[0],
					}
					blockNode.children = conf.siblings.splice(start, end - start, blockNode)
					
				// if node.content === 'for'
					// blockNode
					
				for conf.subindex + 1 to conf.siblings as sibling i
					if sibling.type === 'ln'
						if 
					
		// if node.subtype === 'nesting'
		// logicKeys
		
	})
	
	function findEndBlockNode()
		let start, end, blockNode
		for conf.subindex + 1 to conf.siblings as sibling i
			if sibling.type === 'ln'
				if end === undefined
					end = i
				break
			else if sibling.type === 'block' && sibling.wrap[0] === '('
				blockNode = sibling
				break
			else if sibling.type === 'blank'
				continue
			else
				if start === undefined
					start = i
		if start !== undefined
			if end === undefined
				end = sibling.length - 1
			
			blockNode = {
				type: 'block',
				subtype: 'nesting',
				// start: children[0].start,
				// end: children[children.length - 1].end,
				children: null,
				wrap: nestedBlockWraps[0],
			}
			blockNode.children = conf.siblings.splice(start, end - start, blockNode)
	
	
		
	return toString()

	function toString()	
		/**
		 * @include serializeTree
		 */
		return serializeTree(tree, {
			removeRoot: true,
			sep: '',
			withTab: false,
			getWrapStart(node){
				if node.type === 'block'
					if node.subtype === 'nesting'
						return node.wrap[0]
					else
						return node.wrap[0] + node.content
				else
					return node.content
			},
			getWrapEnd(node){
				if node.type === 'block'
					return node.wrap[1]
			},
		})
		
		
/**
 * @include getByAjax
 */
// getByAjax('http://localhost:6368/?/api/content/getByAjax', (err, rs)=> console.log(parsePyJs(rs)))
// getByAjax('http://localhost/code/code.js/parseStringToSyntaxTree.js', (err, rs)=> console.log(parsePyJs(rs)))
		
console.log(parsePyJs(`//#!py
if a
	if a=> a+ a
		console.log(3)
		
for 3 as ids
	
		
hi ali
a = /\w/+
function a(o)
	return ob
	
function b(o)
	return ob

abc  = (11) +   ((aaa)+(bbb) * (ccc))
`))