//#!py
/**
 * @include eachChildren
 * @param {element} node
 * @return {object}
 */
function node2object(node, op = {})
	const {exceptTagNames = ['style', 'script', '#comment']} = op
	
	return eachChildren(node, (node, conf)=> {
		const obj = createObject(node)
		
		if exceptTagNames.includes(obj.tagName)
			return true
			
		if conf.swap
			conf.swap.children.push(obj)
			
		conf.swap = obj
	})
	
	function createObject(node)
		const obj = {
			tagName: null,
			children: [],
			// attributes: {},
			// properties: {},
			// events: {},
		}
		
		if node.nodeType === 1
			obj.tagName = node.tagName.toLowerCase()
			/**
			 * @include getNodeAttributes isEmptyObject
			 */
			const attributes = getNodeAttributes(node)
			if !isEmptyObject(attributes)
				obj.attributes = attributes
		else
			obj.tagName = node.nodeName
			if node.textContent != null
				obj.properties = {
					textContent: node.textContent
				}
		
		return obj