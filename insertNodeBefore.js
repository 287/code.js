//#!py
/**
 * @desc 插入指定元素前
 * @include isArray
 * @param {element|array<element>} node
 * @param {element} placeholder
 * @return {element|undefined}
 */
function insertNodeBefore(node, placeholder)
	const pNode = placeholder.parentNode
	if pNode
		const nodes = isArray(node) ? node : [node]
		for nodes as node, -
			pNode.insertBefore(node, placeholder)
		return node